import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function RegulationManagement() {
  const [regulations, setRegulations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editRegulationId, setEditRegulationId] = useState(null); // Track the ID for edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    createdDate: '',
    updatedDate: '',
    effectiveDate: '',
    category: '',
  });

  const baseURL = 'https://database-microservice-agrilink.onrender.com/regulations';

  // Fetch regulations on component mount
  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      setRegulations(data);
    } catch (error) {
      console.error('Error fetching regulations:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSaveRegulation = async (e) => {
    e.preventDefault();
    try {
      const method = editRegulationId ? 'PUT' : 'POST';
      const url = editRegulationId ? `${baseURL}/${editRegulationId}` : baseURL;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save regulation');
      }

      // Reset state and refetch data
      setFormData({
        title: '',
        description: '',
        createdDate: '',
        updatedDate: '',
        effectiveDate: '',
        category: '',
      });
      setEditRegulationId(null);
      setOpen(false);
      fetchRegulations();
    } catch (error) {
      console.error('Error saving regulation:', error);
    }
  };

  const handleDeleteRegulation = async (id) => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete regulation');
      }

      fetchRegulations();
    } catch (error) {
      console.error('Error deleting regulation:', error);
    }
  };

  const handleEdit = (regulation) => {
    setEditRegulationId(regulation._id);
    setFormData({
      title: regulation.title,
      description: regulation.description,
      createdDate: regulation.createdDate,
      updatedDate: regulation.updatedDate,
      effectiveDate: regulation.effectiveDate,
      category: regulation.category,
    });
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Regulation Management</h2>
        <Button
          onClick={() => {
            setEditRegulationId(null);
            setFormData({
              title: '',
              description: '',
              createdDate: '',
              updatedDate: '',
              effectiveDate: '',
              category: '',
            });
            setOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add New Regulation
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Updated Date</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regulations.map((regulation) => (
              <TableRow key={regulation._id}>
                <TableCell>{regulation.title}</TableCell>
                <TableCell>{regulation.description}</TableCell>
                <TableCell>{regulation.createdDate}</TableCell>
                <TableCell>{regulation.updatedDate}</TableCell>
                <TableCell>{regulation.effectiveDate}</TableCell>
                <TableCell>{regulation.category}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleEdit(regulation)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRegulation(regulation._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editRegulationId ? 'Edit Regulation' : 'Add Regulation'}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSaveRegulation}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="createdDate">Created Date</Label>
              <Input
                id="createdDate"
                type="date"
                value={formData.createdDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updatedDate">Updated Date</Label>
              <Input
                id="updatedDate"
                type="date"
                value={formData.updatedDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={handleCategoryChange}
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pesticide">Pesticide</SelectItem>
                  <SelectItem value="Land Use">Land Use</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegulationManagement;
