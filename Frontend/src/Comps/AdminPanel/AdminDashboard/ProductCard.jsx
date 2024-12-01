import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ProductCard({ title, subtitle, image, price }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-4">
          <img
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
        <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
