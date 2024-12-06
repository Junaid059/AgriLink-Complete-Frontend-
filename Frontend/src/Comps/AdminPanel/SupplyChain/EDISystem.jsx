import { useState, useEffect } from 'react';
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
import { CalendarIcon, Edit, Trash2 } from 'lucide-react';

function InventoryManagement() {
  const [date, setDate] = useState(null);
  const [productName, setProductName] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [inventoryItems, setInventoryItems] = useState([]);

  // Fetch all inventory items on component mount
  useEffect(() => {
    fetch('http://localhost:3000/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        setInventoryItems(data);
      })
      .catch((error) => console.error('Error fetching inventory:', error));
  }, []);

  // Add an inventory item
  const addInventoryItem = () => {
    const newItem = {
      product: productName,
      quantityAvailable,
      reorderLevel,
      lastUpdated: new Date(date).toISOString(),
    };

    console.log(newItem); // Log the item to ensure the data is correct

    fetch('http://localhost:3000/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, throw an error
          return response.text().then((text) => {
            throw new Error(text); // Log the response as text if it's not JSON
          });
        }
        return response.json();
      })
      .then((data) => {
        setInventoryItems((prevItems) => [...prevItems, data.newItem]);
        // Reset form fields after adding the item
        setProductName('');
        setQuantityAvailable(0);
        setReorderLevel(0);
        setDate(null);
      })
      .catch((error) => {
        console.error('Error adding inventory item:', error);
        alert(`Error: ${error.message}`); // Display the error message to the user
      });
  };

  // Delete an inventory item
  const deleteInventoryItem = (inventoryId) => {
    fetch(`http://localhost:3000/api/inventory/${inventoryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setInventoryItems(
          (prevItems) => prevItems.filter((item) => item._id !== inventoryId) // Use _id here for filtering
        );
      })
      .catch((error) => {
        console.error('Error deleting inventory item:', error);
      });
  };

  const updateInventoryItem = (inventoryId) => {
    // Prompt the user for the new quantity
    const newQuantity = prompt('Enter the new quantity for the item:');

    // Validate the input
    if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
      // If valid, send the update request to the backend
      fetch(`http://localhost:3000/api/inventory/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inventoryId,
          quantityAvailable: parseInt(newQuantity),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the item in the frontend inventory list
          setInventoryItems((prevItems) =>
            prevItems.map((item) =>
              item._id === inventoryId
                ? {
                    ...item,
                    quantityAvailable: data.updatedInventory.quantityAvailable,
                  }
                : item
            )
          );
          alert('Inventory updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating inventory item:', error);
          alert('Failed to update inventory');
        });
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Inventory Table */}
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
              {inventoryItems.map((item) => (
                <TableRow key={item._id}>
                  {' '}
                  {/* Use _id here for the key */}
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.quantityAvailable}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>
                    {item.lastUpdated &&
                      DateTime.fromISO(item.lastUpdated).toLocaleString(
                        DateTime.DATE_MED
                      )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateInventoryItem(item._id)} // Trigger update on click
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteInventoryItem(item._id)}
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

      {/* Add Inventory Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Inventory Item</h2>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Product Name
            </Label>
            <Input
              id="productName"
              className="col-span-3"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity Available
            </Label>
            <Input
              id="quantity"
              type="number"
              className="col-span-3"
              value={quantityAvailable}
              onChange={(e) => setQuantityAvailable(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reorderLevel" className="text-right">
              Reorder Level
            </Label>
            <Input
              id="reorderLevel"
              type="number"
              className="col-span-3"
              value={reorderLevel}
              onChange={(e) => setReorderLevel(Number(e.target.value))}
            />
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
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={addInventoryItem}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
}

export default InventoryManagement;
