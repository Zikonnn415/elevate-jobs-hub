import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  '': 'Home',
  'jobs': 'Find Jobs',
  'companies': 'Companies',
  'about': 'About Us',
  'dashboard': 'Dashboard',
  'jobseeker': 'Job Seeker',
  'company': 'Company',
};

export function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return (
    <nav className="flex items-center gap-1 text-sm px-4 py-3 bg-muted/50 rounded-lg overflow-x-auto dark:bg-slate-800/50">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-1 whitespace-nowrap">
          {index === 0 ? (
            <Link
              to={crumb.href || '/'}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{crumb.label}</span>
            </Link>
          ) : crumb.href ? (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Link
                to={crumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                {crumb.label}
              </Link>
            </>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-foreground">{crumb.label}</span>
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
