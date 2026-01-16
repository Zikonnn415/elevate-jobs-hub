import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumb } from '../Breadcrumb';

export function MainLayout() {
  const location = useLocation();
  const showBreadcrumb = location.pathname !== '/' && !location.pathname.includes('dashboard');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showBreadcrumb && (
        <div className="border-b border-border bg-background/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb />
          </div>
        </div>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
