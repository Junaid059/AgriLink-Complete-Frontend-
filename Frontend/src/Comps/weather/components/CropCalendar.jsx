import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CropCalendar = ({ region, crop, sowingPeriod, harvestPeriod }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="mt-6 border-t-4 border-t-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            <div>
              <CardTitle>Crop Calendar</CardTitle>
              <CardDescription>{region}</CardDescription>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Planting Season</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Harvesting Season</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-48 font-semibold">Crop</TableHead>
                {months.map(month => (
                  <TableHead key={month} className="text-center font-semibold p-0 w-16">
                    {month}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <Sprout className="w-5 h-5 text-green-500" />
                    <span>{crop}</span>
                  </div>
                </TableCell>
                {Array.from({ length: 12 }).map((_, index) => (
                  <TableCell
                    key={index}
                    className="p-0 h-16 relative"
                  >
                    <div className="flex flex-col h-full">
                      {index >= harvestPeriod.start && index <= harvestPeriod.end && (
                        <div className="h-1/2 bg-green-500/20">
                          <div className="h-1 bg-green-500" />
                        </div>
                      )}
                      {index >= sowingPeriod.start && index <= sowingPeriod.end && (
                        <div className="h-1/2 mt-auto bg-blue-500/20">
                          <div className="h-1 bg-blue-500" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCalendar;
