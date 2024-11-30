import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateTime } from 'luxon';
import { CalendarIcon, Edit, Trash2, AlertTriangle, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function InventoryManagement() {
  const [date, setDate] = useState();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Inventory Dashboard</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity Available</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Product A</TableCell>
                <TableCell>50</TableCell>
                <TableCell>20</TableCell>
                <TableCell>2023-06-15</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product B</TableCell>
                <TableCell>15</TableCell>
                <TableCell>25</TableCell>
                <TableCell>2023-06-14</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Add Inventory Item</h2>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Product Name
            </Label>
            <Input id="productName" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity Available
            </Label>
            <Input id="quantity" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reorderLevel" className="text-right">
              Reorder Level
            </Label>
            <Input id="reorderLevel" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastUpdated" className="text-right">
              Last Updated
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Product Image
            </Label>
            <Input id="image" type="file" className="col-span-3" />
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Add Item
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Inventory Alerts</h2>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Stock Alert</AlertTitle>
          <AlertDescription>
            The following products are below the reorder level:
            <ul className="list-disc list-inside mt-2">
              <li>Product B - Current stock: 15 (Reorder level: 25)</li>
              <li>Product C - Current stock: 5 (Reorder level: 15)</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Create Purchase Order</h2>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="poProduct" className="text-right">
              Product
            </Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productA">Product A</SelectItem>
                <SelectItem value="productB">Product B</SelectItem>
                <SelectItem value="productC">Product C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="poQuantity" className="text-right">
              Quantity
            </Label>
            <Input id="poQuantity" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="poDate" className="text-right">
              Order Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Create Purchase Order
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity Ordered</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PO001</TableCell>
                <TableCell>Product A</TableCell>
                <TableCell>100</TableCell>
                <TableCell>$1000</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PO002</TableCell>
                <TableCell>Product B</TableCell>
                <TableCell>50</TableCell>
                <TableCell>$750</TableCell>
                <TableCell>Confirmed</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;
