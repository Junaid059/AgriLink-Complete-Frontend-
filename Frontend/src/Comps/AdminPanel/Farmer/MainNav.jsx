import { Link } from 'react-router-dom';
import { UserNav } from './UserNav';

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            {/* <img
              src="/placeholder.svg"
              alt="AgriLink Logo"
              className="h-8 w-8"
            /> */}
            <span className="font-bold text-green-600">AgriLink</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
