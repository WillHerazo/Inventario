import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  QrCode,
  History,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Suppliers', href: '/suppliers', icon: Users },
  { name: 'QR Codes', href: '/qr-codes', icon: QrCode },
  { name: 'History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Package className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-semibold">Inventory Pro</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          location.pathname === item.href
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <Icon
                          className={cn(
                            location.pathname === item.href
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="flex flex-col gap-2">
                {user && (
                  <div className="flex items-center gap-2 px-2 py-3 text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}