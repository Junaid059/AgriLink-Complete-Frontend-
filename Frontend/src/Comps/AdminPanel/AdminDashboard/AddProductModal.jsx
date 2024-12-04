import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('/placeholder.svg');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      title,
      subtitle,
      image,
      price: parseFloat(price),
    });
    setTitle('');
    setSubtitle('');
    setImage('/placeholder.svg');
    setPrice('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">
            Add New Product
          </DialogTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-right">
              Subtitle
            </Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductModal;
