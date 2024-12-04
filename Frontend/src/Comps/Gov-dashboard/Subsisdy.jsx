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

function SubsidyManagement() {
  const [open, setOpen] = useState(false);
  const [subsidies, setSubsidies] = useState([]); // State to store the fetched subsidies
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editSubsidyId, setEditSubsidyId] = useState(null); // To track which subsidy is being edited

  // Fetch subsidies when the component mounts
  useEffect(() => {
    

    fetchSubsidies();
  }, []);


  const fetchSubsidies = async () => {
    try {
      const response = await fetch('https://database-microservice-agrilink.onrender.com/subsidies');
      const data = await response.json();
      setSubsidies(data);
    } catch (error) {
      console.error('Error fetching subsidies:', error);
    }
  };

  // Handle adding or editing a subsidy
  const handleSaveSubsidy = async (e) => {
    e.preventDefault();

    const deadline = new Date(applicationDeadline);

    const subsidyData = {
      title,
      description,
      region,
      applicationDeadline: deadline,
      amount,
      category,
      createdBy: "674dd1c19a4dbfe260f137ef", // Replace with actual valid ObjectId
    };

    try {
      let response;
      if (editSubsidyId) {
        // Edit existing subsidy
        console.log ('id iddd',editSubsidyId)
        response = await fetch(`https://database-microservice-agrilink.onrender.com/subsidies/${editSubsidyId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subsidyData),
        });
      } else {
        // Add new subsidy
        response = await fetch('https://database-microservice-agrilink.onrender.com/subsidies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subsidyData),
        });
      }

      if (response.ok) {
        const updatedSubsidy = await response.json();
        if (editSubsidyId) {
            fetchSubsidies();

        //   // If editing, update the state with the updated subsidy
        //   setSubsidies((prevSubsidies) =>
        //     prevSubsidies.map((subsidy) =>
        //       subsidy.id === editSubsidyId ? updatedSubsidy : subsidy
        //     )
        //   );
        } else {
            fetchSubsidies();

        //   // If adding, add the new subsidy to the list
        //   setSubsidies((prevSubsidies) => [...prevSubsidies, updatedSubsidy]);
        }
        setOpen(false); // Close the modal after saving
        setEditSubsidyId(null); // Reset the edit state
      } else {
        console.error('Error saving subsidy:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving subsidy:', error);
    }
  };

  // Handle deleting a subsidy
  const handleDeleteSubsidy = async (subsidyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this subsidy?');
    if (confirmDelete) {
      try {
        const response = await fetch(`https://database-microservice-agrilink.onrender.com/subsidies/${subsidyId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
            fetchSubsidies();

          //setSubsidies((prevSubsidies) => prevSubsidies.filter((subsidy) => subsidy.id !== subsidyId));
        } else {
          console.error('Error deleting subsidy:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting subsidy:', error);
      }
    }
  };

  // Open modal to edit a subsidy
  const handleEditSubsidy = (subsidy) => {
    setTitle(subsidy.title);
    setDescription(subsidy.description);
    setRegion(subsidy.region);
    setApplicationDeadline(subsidy.applicationDeadline);
    setAmount(subsidy.amount);
    setCategory(subsidy.category);
    setEditSubsidyId(subsidy._id); // Set the ID of the subsidy being edited
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Subsidy Management</h2>
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add New Subsidy
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subsidies.map((subsidy) => (
              <TableRow key={subsidy.id}>
                <TableCell>{subsidy.title}</TableCell>
                <TableCell>{subsidy.description}</TableCell>
                <TableCell>{subsidy.region}</TableCell>
                <TableCell>{subsidy.applicationDeadline}</TableCell>
                <TableCell>{subsidy.amount}</TableCell>
                <TableCell>{subsidy.category}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleEditSubsidy(subsidy)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSubsidy(subsidy._id)}
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
            <DialogTitle>{editSubsidyId ? 'Edit Subsidy' : 'Add Subsidy'}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSaveSubsidy}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              <Input
                id="applicationDeadline"
                type="date"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-4 w-full">
              {editSubsidyId ? 'Update Subsidy' : 'Save Subsidy'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubsidyManagement;
