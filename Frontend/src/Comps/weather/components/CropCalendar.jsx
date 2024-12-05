import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CropCalendar = ({ region, crop }) => {
  return (
    <div>
      <div className="flex justify-between p-4 w-full">
        <div className='flex w-full'>
          <h2 className="text-lg font-semibold">{region} // Region</h2>
        </div>

        <div className="flex w-full gap-4 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600"></div>
            <span className="text-sm text-gray-600">Planting Season</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span className="text-sm text-gray-600">Harvesting Season</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <Table className="table table-auto w-full border-collapse border border-gray-300">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="border border-gray-300 px-2 py-1 w-24">
                Crop
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Jan
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Feb
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Mar
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Apr
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                May
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Jun
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Jul
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Aug
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Sep
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Oct
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Nov
              </TableHead>
              <TableHead className="border border-gray-300 px-2 py-1 w-12">
                Dec
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 px-4 py-4 w-48">
                <span>{crop}</span>
              </TableCell>
              {Array.from({ length: 12 }).map((_, index) => (
                <TableCell
                  key={index}
                  className="border border-gray-300 p-0 w-24 h-24 relative"
                >
                  {index >= 4 && index <= 5 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-600" />
                  )}
                  {index >= 10 && (
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-green-500" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CropCalendar;
