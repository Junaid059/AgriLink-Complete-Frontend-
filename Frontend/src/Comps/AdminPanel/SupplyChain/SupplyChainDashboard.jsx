import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EDISystem from './EDISystem';
import InventoryManagement from './InventoryManagement';

function SupplyChainDashboard() {
  const [activeTab, setActiveTab] = useState('edi');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edi">EDI System</TabsTrigger>
        <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
      </TabsList>
      <TabsContent value="edi">
        <EDISystem />
      </TabsContent>
      <TabsContent value="inventory">
        <InventoryManagement />
      </TabsContent>
    </Tabs>
  );
}

export default SupplyChainDashboard;
