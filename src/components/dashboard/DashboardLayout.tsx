'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Star, 
  User, 
  LogOut,
  ShoppingBag,
  Settings,
  Menu,
  X
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when pathname changes on mobile
  const handleNavigation = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={cn(
        'bg-white border-r border-secondary-200 fixed h-full z-50 transition-all duration-300 ease-in-out',
        // Mobile: collapsible sidebar
        'w-16 md:w-64',
        // Mobile: slide in/out based on state
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        {/* Logo / Store Info */}
        <div className={cn(
          'p-4 md:p-6 border-b border-secondary-100',
          // Center on mobile
          'flex md:block items-center justify-center md:justify-start'
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            {/* Hide store info on mobile, show on tablet+ */}
            <div className="hidden md:block">
              <h2 className="font-bold text-secondary-900">{storeName}</h2>
              <p className="text-xs text-secondary-500">Seller Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 md:p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavigation}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900',
                  // Center icon on mobile
                  'justify-center md:justify-start'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-primary-600' : 'text-secondary-400')} />
                {/* Hide text on mobile, show on tablet+ */}
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 border-t border-secondary-100">
          <button
            onClick={handleNavigation}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 w-full transition-colors',
              'justify-center md:justify-start'
            )}
          >
            <Settings className="w-5 h-5 text-secondary-400 flex-shrink-0" />
            <span className="hidden md:inline">Settings</span>
          </button>
          <button
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors',
              'justify-center md:justify-start'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-secondary-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-secondary-600" />
              ) : (
                <Menu className="w-6 h-6 text-secondary-600" />
              )}
            </button>
            
            <div className="flex-1 md:flex-none">
              <h1 className="text-xl font-semibold text-secondary-900">
                {navigation.find(n => pathname === n.href || (n.href !== '/dashboard' && pathname.startsWith(n.href)))?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-secondary-500 hidden md:block">Welcome back, {sellerName}</p>
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
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

