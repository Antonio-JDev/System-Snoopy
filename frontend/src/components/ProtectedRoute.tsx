import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'ATTENDANT' | 'DRIVER')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se há roles permitidas, verificar se o usuário tem permissão
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirecionar baseado no role do usuário
    if (user.role === 'ADMIN') {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role === 'ATTENDANT') {
      return <Navigate to="/pedidos" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
