import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from './ProductCard';

function ProductCarousel() {
  const products = [
    {
      title: 'Product 1',
      subtitle: 'Description 1',
      image: '/placeholder.svg',
      price: 19.99,
    },
    {
      title: 'Product 2',
      subtitle: 'Description 2',
      image: '/placeholder.svg',
      price: 29.99,
    },
    {
      title: 'Product 3',
      subtitle: 'Description 3',
      image: '/placeholder.svg',
      price: 39.99,
    },
    {
      title: 'Product 4',
      subtitle: 'Description 4',
      image: '/placeholder.svg',
      price: 49.99,
    },
  ];

  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index}>
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ProductCarousel;
