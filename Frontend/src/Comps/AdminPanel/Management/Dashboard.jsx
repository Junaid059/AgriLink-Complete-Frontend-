import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewPanel from './OverviewPanel';
import DataVisualizations from './DataVisualization';
import WeatherWidgets from './WeatherWidgets';
import RecordsManagement from './RecordsManagement';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="visualizations">Data Visualizations</TabsTrigger>
        <TabsTrigger value="weather">Weather</TabsTrigger>
        <TabsTrigger value="records">Records Management</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewPanel />
      </TabsContent>
      <TabsContent value="visualizations">
        <DataVisualizations />
      </TabsContent>
      <TabsContent value="weather">
        <WeatherWidgets />
      </TabsContent>
      <TabsContent value="records">
        <RecordsManagement />
      </TabsContent>
    </Tabs>
  );
}

export default Dashboard;
