import { useState, useEffect } from 'react';
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
import { CalendarIcon, Eye, Trash2 } from 'lucide-react';

function EDISystem() {
  const [messageType, setMessageType] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState('');
  const [ediMessages, setEdiMessages] = useState([]);

  // Fetch all EDI messages from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/ediMessage')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        return response.json();
      })
      .then((data) => setEdiMessages(data))
      .catch((error) => console.error('Error fetching EDI messages:', error));
  }, []);

  // Create a new EDI message
  function createEdiMessage() {
    const newMessage = {
      messageType,
      sender,
      receiver,
      date,
      message,
    };

    fetch('http://localhost:3000/api/ediMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create message');
        }
        return response.json();
      })
      .then((data) => {
        setEdiMessages((prevMessages) => [...prevMessages, data.ediMessage]);
        // Reset form fields
        setMessageType('');
        setSender('');
        setReceiver('');
        setDate(null);
        setMessage('');
        console.log('EDI message created:', data);
      })
      .catch((error) => console.error('Error creating EDI message:', error));
  }

  // View message details
  function handleView(id) {
    const message = ediMessages.find((msg) => msg._id === id);
    if (message) {
      alert(JSON.stringify(message, null, 2));
    }
  }

  // Delete a message (frontend only; you can add backend logic here)
  // Delete a message (frontend only; you can add backend logic here)
  function handleDelete(id) {
    // Send a DELETE request to the backend to remove the message
    fetch(`http://localhost:3000/api/ediMessage/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message deleted:', data);
        // Optionally, remove the deleted message from the state
        setEdiMessages(ediMessages.filter((message) => message._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="messageType" className="text-right">
            Message Type
          </Label>
          <Select
            value={messageType}
            onValueChange={(value) => setMessageType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PurchaseOrder">Purchase Order</SelectItem>
              <SelectItem value="Invoice">Invoice</SelectItem>
              <SelectItem value="OrderConfirmation">
                Order Confirmation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sender" className="text-right">
            Sender
          </Label>
          <Input
            id="sender"
            className="col-span-3"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="receiver" className="text-right">
            Receiver
          </Label>
          <Input
            id="receiver"
            className="col-span-3"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
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
          <Textarea
            id="body"
            className="col-span-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={createEdiMessage}
      >
        Create EDI Message
      </Button>

      {/* Table Section */}
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender ID</TableHead>
              <TableHead>Receiver ID</TableHead>
              <TableHead>Message Type</TableHead>
              <TableHead>Message Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ediMessages.map((message) => (
              <TableRow key={message._id}>
                <TableCell>{message.sender}</TableCell>
                <TableCell>{message.receiver}</TableCell>
                <TableCell>{message.messageType}</TableCell>
                <TableCell>
                  {message.messageDate &&
                  !isNaN(new Date(message.messageDate).getTime())
                    ? format(new Date(message.messageDate), 'PPP')
                    : 'Invalid Date'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => handleView(message._id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => handleDelete(message._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EDISystem;
