'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Star, 
  User, 
  LogOut,
  ShoppingBag,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sellerName?: string;
  storeName?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Products', href: '/dashboard/products', icon: Package },
  { name: 'Reviews & Ratings', href: '/dashboard/reviews', icon: Star },
  { name: 'My Profile', href: '/profile', icon: User },
];

export function DashboardLayout({ children, sellerName = 'Seller', storeName = 'My Store' }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-secondary-200 fixed h-full z-30">
        {/* Logo / Store Info */}
        <div className="p-6 border-b border-secondary-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-secondary-900">{storeName}</h2>
              <p className="text-xs text-secondary-500">Seller Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-primary-600' : 'text-secondary-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-100">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 w-full transition-colors"
          >
            <Settings className="w-5 h-5 text-secondary-400" />
            Settings
          </button>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-secondary-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-secondary-900">
                {navigation.find(n => pathname === n.href || (n.href !== '/dashboard' && pathname.startsWith(n.href)))?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-secondary-500">Welcome back, {sellerName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  View Shop
                </Button>
              </Link>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {sellerName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

