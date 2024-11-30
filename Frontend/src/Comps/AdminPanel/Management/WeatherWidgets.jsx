import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

function WeatherWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Sun className="h-12 w-12 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold">24°C</div>
          <p>Sunny</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tomorrow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Cloud className="h-12 w-12 text-gray-500 mb-2" />
          <div className="text-2xl font-bold">22°C</div>
          <p>Cloudy</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Day After</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CloudRain className="h-12 w-12 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">19°C</div>
          <p>Rain</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wind</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Wind className="h-12 w-12 text-green-500 mb-2" />
          <div className="text-2xl font-bold">15 km/h</div>
          <p>North-East</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherWidgets;
