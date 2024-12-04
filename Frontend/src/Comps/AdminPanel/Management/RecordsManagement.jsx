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
  const [activeForm, setActiveForm] = useState('');
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

  const handleAddSeed = () => {
    setSeedRecords([...seedRecords, formData]);
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
    setIsDialogOpen(false);  // Close the dialog after saving
  };

  const handleAddPesticide = () => {
    setPesticideRecords([...pesticideRecords, formData]);
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
    setIsDialogOpen(false);  // Close the dialog after saving
  };

  const handleAddSupplier = () => {
    setSupplierRecords([...supplierRecords, formData]);
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
    setIsDialogOpen(false);  // Close the dialog after saving
  };

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
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button
            onClick={() => {
              setActiveForm('seed');
              setIsDialogOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Seed
          </Button>
          <Button
            onClick={() => {
              setActiveForm('pesticide');
              setIsDialogOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Pesticide
          </Button>
          <Button
            onClick={() => {
              setActiveForm('supplier');
              setIsDialogOpen(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Add Supplier
          </Button>
        </div>
      </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Add New {activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {activeForm === 'seed' && (
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

              {activeForm === 'pesticide' && (
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
                    placeholder="Type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <Input
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                </>
              )}

              {activeForm === 'supplier' && (
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
                onClick={() => {
                  if (activeForm === 'seed') handleAddSeed();
                  if (activeForm === 'pesticide') handleAddPesticide();
                  if (activeForm === 'supplier') handleAddSupplier();
                }}
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
