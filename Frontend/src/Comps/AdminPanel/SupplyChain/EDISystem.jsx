import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Eye, Trash2, Send } from 'lucide-react';

function EDISystem() {
  const [date, setDate] = useState();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="messageType" className="text-right">
            Message Type
          </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="purchaseOrder">Purchase Order</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="orderConfirmation">
                Order Confirmation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sender" className="text-right">
            Sender
          </Label>
          <Input id="sender" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="receiver" className="text-right">
            Receiver
          </Label>
          <Input id="receiver" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="body" className="text-right">
            Body Content
          </Label>
          <Textarea id="body" className="col-span-3" />
        </div>
      </div>
      <Button className="bg-green-600 hover:bg-green-700">
        Create EDI Message
      </Button>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender ID</TableHead>
              <TableHead>Receiver ID</TableHead>
              <TableHead>Message Type</TableHead>
              <TableHead>Message Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>SENDER001</TableCell>
              <TableCell>RECEIVER001</TableCell>
              <TableCell>Purchase Order</TableCell>
              <TableCell>2023-06-15</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <Button variant="outline" size="icon" className="mr-2">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="mr-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EDISystem;
