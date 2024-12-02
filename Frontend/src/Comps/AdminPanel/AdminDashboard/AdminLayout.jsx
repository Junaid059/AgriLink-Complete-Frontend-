import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* This renders the child route's element */}
      </div>
    </div>
  );
}

export default AdminLayout;
