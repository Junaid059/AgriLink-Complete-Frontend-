import { Toaster } from '@/components/ui/toaster';
import Header from '../Header'; // Adjust the import path based on your actual Header location

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Toaster />
    </div>
  );
}

export default Layout;
