import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

function CartButton() {
  const { toggleCart, cartCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={toggleCart}
    >
      <ShoppingCart className="h-4 w-4" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {cartCount}
        </span>
      )}
    </Button>
  );
}

export default CartButton;
