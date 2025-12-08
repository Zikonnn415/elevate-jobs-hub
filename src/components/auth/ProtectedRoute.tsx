import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { UserType } from '@/models/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: UserType[];
}

export function ProtectedRoute({ children, allowedUserTypes }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (allowedUserTypes && user && !allowedUserTypes.includes(user.userType)) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath =
      user.userType === 'company' ? '/dashboard/company' : '/dashboard/jobseeker';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
