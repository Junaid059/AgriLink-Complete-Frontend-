import { useState } from 'react';
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

const regulations = [
  {
    id: 1,
    title: 'Pesticide Regulation 1',
    description: 'Regulation for pesticide use in agriculture.',
    createdDate: '2023-01-01',
    updatedDate: '2023-01-05',
    effectiveDate: '2023-02-01',
    category: 'Pesticide',
  },
  {
    id: 2,
    title: 'Land Use Regulation 1',
    description: 'Regulation for land use in agricultural zones.',
    createdDate: '2023-02-01',
    updatedDate: '2023-02-10',
    effectiveDate: '2023-03-01',
    category: 'Land Use',
  },
];

function RegulationManagement() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Regulation Management
        </h2>
        <Button
          onClick={() => setOpen(true)}
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
              <TableRow key={regulation.id}>
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
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
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
            <DialogTitle>Add Regulation</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="createdDate">Created Date</Label>
              <Input id="createdDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updatedDate">Updated Date</Label>
              <Input id="updatedDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input id="effectiveDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesticide">Pesticide</SelectItem>
                  <SelectItem value="landuse">Land Use</SelectItem>
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
