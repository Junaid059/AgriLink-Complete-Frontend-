import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

function CartPanel() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90vw] sm:w-[540px] sm:max-w-[540px]">
        <SheetHeader className="space-y-4 pb-4">
          <SheetTitle className="flex items-center justify-between">
            Cart ({cartItems.length})
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleCart}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="space-y-4 pr-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between space-x-4 border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
            <p className="text-center text-gray-500">Your cart is empty</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartPanel;
