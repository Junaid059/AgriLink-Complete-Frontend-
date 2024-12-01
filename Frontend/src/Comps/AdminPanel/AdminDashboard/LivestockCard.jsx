import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

function LivestockCard({ title, count, type, health }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-green-600">{count}</p>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
          <Leaf className="h-12 w-12 text-green-500" />
        </div>
        <p className="mt-4 text-sm font-medium">
          Health: <span className="text-green-500">{health}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default LivestockCard;
