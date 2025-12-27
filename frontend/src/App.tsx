import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Pedidos } from './pages/Pedidos';
import { Estoque } from './pages/Estoque';
import { Logistica } from './pages/Logistica';
import { Financeiro } from './pages/Financeiro';
import { Arquivos } from './pages/Arquivos';
import { Mensagens } from './pages/Mensagens';
import { Chat } from './pages/Chat';
import { Relatorios } from './pages/Relatorios';
import { Roteirizador } from './pages/Roteirizador';

function LoginRoute() {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    // Redirecionar baseado no role
    if (user.role === 'ADMIN') {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role === 'ATTENDANT') {
      return <Navigate to="/pedidos" replace />;
    }
  }
  
  return <Login />;
}

function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<LoginRoute />} />
        {/* Rotas Públicas */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Rotas Privadas - Admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/estoque"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <MainLayout>
                <Estoque />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/financeiro"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <MainLayout>
                <Financeiro />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rotas Privadas - Atendente */}
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute allowedRoles={['ATTENDANT', 'ADMIN']}>
              <MainLayout>
                <Pedidos />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/roteirizador"
          element={
            <ProtectedRoute allowedRoles={['ATTENDANT', 'ADMIN']}>
              <MainLayout>
                <Roteirizador />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Rotas Compartilhadas (Admin e Atendente) */}
        <Route
          path="/logistica"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ATTENDANT']}>
              <MainLayout>
                <Logistica />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/arquivos"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ATTENDANT']}>
              <MainLayout>
                <Arquivos />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mensagens"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ATTENDANT']}>
              <MainLayout>
                <Mensagens />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ATTENDANT']}>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ATTENDANT']}>
              <MainLayout>
                <Relatorios />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
