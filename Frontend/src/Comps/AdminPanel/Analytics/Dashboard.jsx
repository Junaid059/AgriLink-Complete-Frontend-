import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewPanel from './OverviewPanel';
import CropTab from './CropTab';
import Products from './ProductsTab';
import Livestock from './Livestock';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="crops">Crops</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="livestock">Livestock</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewPanel onTabChange={setActiveTab}/>
      </TabsContent>
      <TabsContent value="crops">
        <CropTab/>
      </TabsContent>
      <TabsContent value="products">
        <Products />
      </TabsContent>
      <TabsContent value="livestock">
        <Livestock />
      </TabsContent>
    </Tabs>
  );
}

export default Dashboard;
