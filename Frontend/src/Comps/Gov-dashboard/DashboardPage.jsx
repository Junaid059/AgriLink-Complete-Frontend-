// import { Button } from '@/components/ui/button';
import RegulationManagement from './RegulationManagement';
import SubsidyManagement from './Subsisdy';
import SubsidyApp from './SubsidyAppManagement';

function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to the Government Official Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <RegulationManagement />
        <SubsidyApp />
        <SubsidyManagement/>

      </div>
    </div>
  );
}

export default DashboardPage;
