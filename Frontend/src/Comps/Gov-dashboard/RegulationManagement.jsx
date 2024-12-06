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
  const [editRegulationId, setEditRegulationId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    effectiveDate: '',
    category: '',
    type: 'regulatory'
  });

  const baseURL = 'https://database-microservice-agrilink.onrender.com/regulations';

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


  const handleSaveRegulation = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      console.error('Category is required.');
      alert('Please select a category before saving.');
      return;
  }

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
        const errorText = await response.text();
        throw new Error(`Failed to save regulation: ${errorText}`);
      }


      if ( method === 'POST')
      {
       // Notify the user
       const notificationResponse = await fetch(`https://database-microservice-agrilink.onrender.com/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: `6751be027f4de71db840ea69`, // Assuming the farmer's user ID is accessible
            type: `new_regulation`,
            message: `New regulation has been uploaded! Check it out.`,
            isRead: false,
        }),
    });

    if (!notificationResponse.ok) {
        throw new Error('Failed to send notification');
    }

  }

  else
  {

    // Notify the user
    const notificationResponse = await fetch(`https://database-microservice-agrilink.onrender.com/notifications`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: `6751be027f4de71db840ea69`, // Assuming the farmer's user ID is accessible
        type: `new_regulation`,
          message: `Exisisting regulation has been updated! Check it out.`,
          isRead: false,
      }),
  });

  if (!notificationResponse.ok) {
      throw new Error('Failed to send notification');
  }


  }

      setFormData({
        title: '',
        description: '',
        effectiveDate: '',
        category: '',
        type: 'regulatory'
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
      effectiveDate: regulation.effectiveDate,
      category: regulation.category,
      type: regulation.type || 'regulatory'
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
              effectiveDate: '',
              category: '',
              type: 'regulatory'
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
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
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
                <TableCell>
                  {new Date(regulation.createdAt).toISOString().split('T')[0]}
                </TableCell>
                <TableCell>              
                  {new Date(regulation.updatedAt).toISOString().split('T')[0]}
                </TableCell>
                <TableCell>
                  {new Date(regulation.effectiveDate).toISOString().split('T')[0]}
                </TableCell>               
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
  onValueChange={(value) => setFormData(prevData => ({
    ...prevData, 
    category: value
  }))}
  value={formData.category}
>
  <SelectTrigger>
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="pesticide">Pesticide</SelectItem>
    <SelectItem value="land_management">Land Use</SelectItem>
    <SelectItem value="crop_protection">Crop Protection</SelectItem>
    <SelectItem value="other">Other</SelectItem>
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