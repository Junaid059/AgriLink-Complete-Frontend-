import RegulationManagement from './RegulationManagement';
import SubsidyManagement from './Subsisdy';
import SubsidyApp from './SubsidyAppManagement';
import NavBar from './NavBar'
function DashboardPage() {
  return (

    <><NavBar /><div className="container mx-auto p-6 space-y-6">


      {/* Stacking all tables in one column */}
      <div className="space-y-6">
        <RegulationManagement />
        <SubsidyApp />
        <SubsidyManagement />
      </div>
    </div></>
  );
}

export default DashboardPage;
