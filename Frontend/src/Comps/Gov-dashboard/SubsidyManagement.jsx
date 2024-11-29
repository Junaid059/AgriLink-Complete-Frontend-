'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const subsidies = [
  {
    id: 1,
    applicantName: 'John Doe',
    submissionDate: '2024-11-23',
    status: 'Pending',
    type: 'Farm Subsidy',
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    submissionDate: '2024-11-20',
    status: 'Pending',
    type: 'Agriculture Subsidy',
  },
];

function SubsidyManagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Subsidy Application Management
      </h2>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subsidies.map((subsidy) => (
              <TableRow key={subsidy.id}>
                <TableCell>{subsidy.applicantName}</TableCell>
                <TableCell>{subsidy.submissionDate}</TableCell>
                <TableCell>{subsidy.status}</TableCell>
                <TableCell>{subsidy.type}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SubsidyManagement;
