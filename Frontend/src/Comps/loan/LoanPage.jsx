import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCcw, Plus } from 'lucide-react';
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
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Footer from '../Footer';

const LoanPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Loan Application */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Loan Application</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Input placeholder="Farmer ID" />
                <Input placeholder="Loan Amount" />
                <Input placeholder="Interest Rate (%)" />
                <Input placeholder="Loan Term (years)" />
                <Input type="date" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Application
              </Button>
            </div>
          </div>

          {/* Credit Score */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Credit Score</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Farmer ID: 12345
                  </span>
                  <span className="text-sm text-gray-500">
                    Credit Score: 750
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last Updated: 2023-09-15
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-09-01</TableCell>
                    <TableCell>Loan Payment</TableCell>
                    <TableCell className="text-green-600">+20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-08-15</TableCell>
                    <TableCell>Missed Payment</TableCell>
                    <TableCell className="text-red-600">-30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex gap-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Refresh Score
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-green-50 shadow-lg rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Payment</h2>
          </div>
          <div className="p-4 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Payment ID" />
              <Input placeholder="Amount" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="md:col-span-2" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-09-10</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$200</TableCell>
                  <TableCell>
                    <span className="text-green-600">Completed</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-08-25</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell>$150</TableCell>
                  <TableCell>
                    <span className="text-yellow-600">Pending</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Loan Repayment Monitoring */}
        <div className="bg-gray-100 shadow-lg rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Loan Repayment Monitoring</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Total Due</div>
                <div className="font-semibold">$5000</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Paid</div>
                <div className="font-semibold">$3500</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Next Due Date</div>
                <div className="font-semibold">2023-10-10</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500">
                Repayment Status: 70% Complete
              </div>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={70}
                  text={`${70}%`}
                  styles={buildStyles({
                    pathColor: '#4caf50', // Green color for the path
                    textColor: '#333', // Dark text color
                    trailColor: '#e6e6e6', // Light gray color for the trail
                  })}
                />
              </div>
            </div>

            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                Alert: You have overdue payments!
                <br />
                Please make a payment to avoid penalties.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanPage;
