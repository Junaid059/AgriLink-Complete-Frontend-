import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

function RecordsManagement() {
  const [activeTab, setActiveTab] = useState('seed'); // Tracks the active tab
  const [seedRecords, setSeedRecords] = useState([]);
  const [pesticideRecords, setPesticideRecords] = useState([]);
  const [supplierRecords, setSupplierRecords] = useState([]);
  const [formData, setFormData] = useState({
    seedId: '',
    name: '',
    type: '',
    description: '',
    cropType: '',
    quantity: '',
    unit: '',
    dateOfPurchase: '',
    origin: '',
    isCertified: false,
    supplierId: '',
    pesticideId: '',
    expiryDate: '',
    compliance: false,
    usageInstructions: '',
    supplier_id: '',
    address: '',
    contact_phone: '',
    contact_email: '',
    rating: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle adding records based on the active tab
  const handleAddRecord = () => {
    if (activeTab === 'seed') {
      setSeedRecords([...seedRecords, formData]);
    } else if (activeTab === 'pesticide') {
      setPesticideRecords([...pesticideRecords, formData]);
    } else if (activeTab === 'supplier') {
      setSupplierRecords([...supplierRecords, formData]);
    }

    // Clear form and close dialog
    setFormData({
      seedId: '',
      name: '',
      type: '',
      description: '',
      cropType: '',
      quantity: '',
      unit: '',
      dateOfPurchase: '',
      origin: '',
      isCertified: false,
      supplierId: '',
      pesticideId: '',
      expiryDate: '',
      compliance: false,
      usageInstructions: '',
      supplier_id: '',
      address: '',
      contact_phone: '',
      contact_email: '',
      rating: '',
    });
    setIsDialogOpen(false);
  };

  // Handle deleting records
  const handleDeleteRecord = (index, type) => {
    if (type === 'seed') {
      const updatedRecords = [...seedRecords];
      updatedRecords.splice(index, 1);
      setSeedRecords(updatedRecords);
    } else if (type === 'pesticide') {
      const updatedRecords = [...pesticideRecords];
      updatedRecords.splice(index, 1);
      setPesticideRecords(updatedRecords);
    } else if (type === 'supplier') {
      const updatedRecords = [...supplierRecords];
      updatedRecords.splice(index, 1);
      setSupplierRecords(updatedRecords);
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <Button
          className={`${activeTab === 'seed' ? 'bg-green-600' : 'bg-gray-200'
            } text-white hover:bg-green-700`}
          onClick={() => setActiveTab('seed')}
        >
          Seeds
        </Button>
        <Button
          className={`${activeTab === 'pesticide' ? 'bg-blue-600' : 'bg-gray-200'
            } text-white hover:bg-blue-700`}
          onClick={() => setActiveTab('pesticide')}
        >
          Pesticides
        </Button>
        <Button
          className={`${activeTab === 'supplier' ? 'bg-yellow-600' : 'bg-gray-200'
            } text-white hover:bg-yellow-700`}
          onClick={() => setActiveTab('supplier')}
        >
          Suppliers
        </Button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Button>
        </div>

        {/* Table for each type */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Te</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                activeTab === 'supplier' ? (
                  supplierRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.supplierId}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.contact_phone}</TableCell>
                      <TableCell>{record.contact_email}</TableCell>
                      <TableCell>{record.rating}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteRecord(index, activeTab)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : activeTab === 'pesticide' ? (
                  pesticideRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.dateOfPurchase || record.expiryDate || ''}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteRecord(index, activeTab)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  seedRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.dateOfPurchase || record.expiryDate || ''}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteRecord(index, activeTab)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>

          </Table>
        </div>
      </div>

      {/* Dialog for adding records */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {activeTab === 'seed' && (
                <>
                  <Input
                    placeholder="Seed ID"
                    value={formData.seedId}
                    onChange={(e) => setFormData({ ...formData, seedId: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Crop Type"
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    type="date"
                    placeholder="Date of Purchase"
                    value={formData.dateOfPurchase}
                    onChange={(e) => setFormData({ ...formData, dateOfPurchase: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Origin (local/imported)"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    type="checkbox"
                    checked={formData.isCertified}
                    onChange={() => setFormData({ ...formData, isCertified: !formData.isCertified })}
                  /> Certified
                  <Input
                    placeholder="Supplier ID"
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="border p-2 rounded"
                  />
                </>
              )}

              {activeTab === 'pesticide' && (
                <>
                  <Input
                    placeholder="Pesticide ID"
                    value={formData.pesticideId}
                    onChange={(e) => setFormData({ ...formData, pesticideId: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Type (Herbicide/Insecticide)"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Crop Type"
                    value={formData.cropType}
                    onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    type="date"
                    placeholder="Expiry Date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    type="checkbox"
                    checked={formData.compliance}
                    onChange={() => setFormData({ ...formData, compliance: !formData.compliance })}
                  /> Compliance
                  <Input
                    placeholder="Usage Instructions"
                    value={formData.usageInstructions}
                    onChange={(e) => setFormData({ ...formData, usageInstructions: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Supplier ID"
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="border p-2 rounded"
                  />
                </>
              )}

              {activeTab === 'supplier' && (
                <>
                  <Input
                    placeholder="Supplier ID"
                    value={formData.supplier_id}
                    onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="border p-2 rounded"
                  />
                </>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white"
                onClick={() => setIsDialogOpen(false)} // Close the dialog
              >
                Close
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddRecord}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default RecordsManagement;
