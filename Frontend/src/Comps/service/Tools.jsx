import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Play, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartButton from '../cart/CartButton';
import CartPanel from '../cart/CartPanel';
import Header from '../UserHeader';
import Footer from '../Footer';

// Mock Data (Replace with actual API call)
const mockProducts = [
  {
    id: 1,
    name: 'Tractor',
    price: 15000.99,
    rating: 4.8,
    image: '/tractor.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Plough',
    price: 499.99,
    rating: 4.5,
    image: '/plough.svg?height=200&width=200',
  },
  {
    id: 3,
    name: 'Seed Drill',
    price: 1200.49,
    rating: 4.6,
    image: '/seed-drill.svg?height=200&width=200',
  },
  {
    id: 4,
    name: 'Harvester',
    price: 25000.99,
    rating: 4.7,
    image: '/harvester.svg?height=200&width=200',
  },
  {
    id: 5,
    name: 'Sprinkler System',
    price: 799.99,
    rating: 4.4,
    image: '/sprinkler-system.svg?height=200&width=200',
  },
  {
    id: 6,
    name: 'Rotavator',
    price: 349.99,
    rating: 4.3,
    image: '/rotavator.svg?height=200&width=200',
  },
  {
    id: 7,
    name: 'Hand Tiller',
    price: 99.49,
    rating: 4.1,
    image: '/hand-tiller.svg?height=200&width=200',
  },
  {
    id: 8,
    name: 'Water Pump',
    price: 399.99,
    rating: 4.2,
    image: '/water-pump.svg?height=200&width=200',
  },
  {
    id: 9,
    name: 'Cultivator',
    price: 599.49,
    rating: 4.6,
    image: '/cultivator.svg?height=200&width=200',
  },
];

function Tools() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = mockProducts.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(fetchedProduct);
  }, [id]);

  const handleAddToCart = (selectedProduct) => {
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
      image: selectedProduct.image,
    });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

      {/* Banner */}
      <div
        className="h-48 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=192&width=1920')",
        }}
      >
        <h1 className="text-4xl font-bold text-white">Our Shop</h1>
      </div>

      {/* Product Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-8 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-2xl font-semibold text-primary mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(Math.round(product.rating))].map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 border-0"
                />
              </div>
              <Button
                className="bg-primary text-white"
                onClick={() => handleAddToCart(product)}
                disabled={quantity < 1}
              >
                Add to Cart
              </Button>
            </div>
            <div>
              <h2>Cart</h2>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                      <Button onClick={() => handleRemoveFromCart(item.id)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Reviews for {product.name}
          </h3>

          {/* Existing Review */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Reviewer"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Martin Smith</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    These tomatoes are incredibly fresh and flavorful. Perfect
                    for my salads.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Review Form */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Add a review</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Write your review here..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button>Submit Review</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Tools;
