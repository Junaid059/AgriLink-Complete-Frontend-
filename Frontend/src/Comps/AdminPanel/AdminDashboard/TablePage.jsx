import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const productData = [
  {
    id: 1,
    name: 'Product A',
    category: 'Electronics',
    price: 199.99,
    stock: 50,
  },
  { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 100 },
  { id: 3, name: 'Product C', category: 'Home', price: 99.99, stock: 25 },
  {
    id: 4,
    name: 'Product D',
    category: 'Electronics',
    price: 299.99,
    stock: 10,
  },
  { id: 5, name: 'Product E', category: 'Clothing', price: 79.99, stock: 75 },
];

const cropData = [
  { id: 1, name: 'Wheat', type: 'Grain', yield: 3.5, harvestTime: 120 },
  { id: 2, name: 'Corn', type: 'Grain', yield: 9.5, harvestTime: 90 },
  { id: 3, name: 'Soybeans', type: 'Legume', yield: 2.8, harvestTime: 100 },
  { id: 4, name: 'Rice', type: 'Grain', yield: 4.5, harvestTime: 135 },
  { id: 5, name: 'Potatoes', type: 'Tuber', yield: 20, harvestTime: 80 },
];

function TablePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('');
  const [showCrops, setShowCrops] = useState(false);

  const data = showCrops ? cropData : productData;

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      (item.category || item.type).toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleTable = () => {
    setShowCrops(!showCrops);
    setCurrentPage(1);
    setFilter('');
    setSortColumn('name');
    setSortDirection('asc');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Table</h1>
      <div className="flex justify-between items-center">
        <Button
          onClick={toggleTable}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          {showCrops ? 'Show Products' : 'Show Crops'}
        </Button>
      </div>
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-700">
            {showCrops ? 'Crops' : 'Products'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder={`Filter ${showCrops ? 'crops' : 'products'}...`}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-64 border-green-300 focus:border-green-500 focus:ring-green-500"
            />
            <Select onValueChange={(value) => console.log(value)}>
              <SelectTrigger className="w-[180px] border-green-300 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">Export as CSV</SelectItem>
                <SelectItem value="pdf">Export as PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-green-100">
                <TableHead
                  onClick={() => handleSort('name')}
                  className="cursor-pointer text-green-700 hover:text-green-900"
                >
                  Name
                </TableHead>
                <TableHead
                  onClick={() => handleSort(showCrops ? 'type' : 'category')}
                  className="cursor-pointer text-green-700 hover:text-green-900"
                >
                  {showCrops ? 'Type' : 'Category'}
                </TableHead>
                <TableHead
                  onClick={() => handleSort(showCrops ? 'yield' : 'price')}
                  className="cursor-pointer text-green-700 hover:text-green-900"
                >
                  {showCrops ? 'Yield (tons/acre)' : 'Price'}
                </TableHead>
                <TableHead
                  onClick={() =>
                    handleSort(showCrops ? 'harvestTime' : 'stock')
                  }
                  className="cursor-pointer text-green-700 hover:text-green-900"
                >
                  {showCrops ? 'Harvest Time (days)' : 'Stock'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-green-100">
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{showCrops ? item.type : item.category}</TableCell>
                  <TableCell>
                    {showCrops
                      ? `${item.yield} tons/acre`
                      : `$${item.price.toFixed(2)}`}
                  </TableCell>
                  <TableCell>
                    {showCrops ? `${item.harvestTime} days` : item.stock}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="border-green-500 text-green-700 hover:bg-green-100"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-green-500 text-green-700 hover:bg-green-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant={currentPage === number ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(number)}
                className={
                  currentPage === number
                    ? 'bg-green-500 text-white'
                    : 'border-green-500 text-green-700 hover:bg-green-100'
                }
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className="border-green-500 text-green-700 hover:bg-green-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(pageNumbers.length)}
              disabled={currentPage === pageNumbers.length}
              className="border-green-500 text-green-700 hover:bg-green-100"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TablePage;
