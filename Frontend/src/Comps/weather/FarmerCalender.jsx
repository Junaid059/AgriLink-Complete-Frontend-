import Header from '../Header';
import Footer from '../Footer';
import { Button } from '@/components/ui/button';
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

const months = ['January', 'February', 'March', 'April'];
const crops = ['Corn', 'Wheat', 'Soybeans', 'Rice'];
const activities = {
  Corn: ['Planting', 'Growing', 'Growing', 'Harvest'],
  Wheat: ['Harvest', 'Dormant', 'Growing', 'Growing'],
  Soybeans: ['Prepare Soil', 'Planting', 'Growing', 'Growing'],
  Rice: ['Dormant', 'Prepare Soil', 'Planting', 'Growing'],
};

function FarmerCalendar() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Farming Calendar</h1>

          <div className="text-sm text-muted-foreground">
            Providing crop recommendations based on region and weather forecast
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Region</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="southwest">Southwest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="soybeans">Soybeans</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Month</TableHead>
                  {crops.map((crop) => (
                    <TableHead key={crop}>{crop}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {months.map((month, index) => (
                  <TableRow key={month}>
                    <TableCell className="font-medium">{month}</TableCell>
                    {crops.map((crop) => (
                      <TableCell key={`${month}-${crop}`}>
                        {activities[crop][index]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button className="w-full md:w-auto bg-green-500 hover:bg-green-600">
            Get Activity Alerts
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FarmerCalendar;
