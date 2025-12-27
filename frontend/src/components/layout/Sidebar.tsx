import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Mail, 
  MessageSquare, 
  FileText, 
  Upload, 
  PlusCircle,
  LogOut,
  Package,
  ShoppingCart,
  Truck,
  DollarSign,
  Route
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard', roles: ['ADMIN'] },
  { icon: ShoppingCart, label: 'Pedidos', path: '/pedidos', roles: ['ATTENDANT', 'ADMIN'] },
  { icon: Package, label: 'Estoque', path: '/estoque', roles: ['ADMIN'] },
  { icon: Route, label: 'Roteirizador', path: '/roteirizador', roles: ['ATTENDANT', 'ADMIN'] },
  { icon: Truck, label: 'Logística', path: '/logistica', roles: ['ADMIN', 'ATTENDANT'] },
  { icon: DollarSign, label: 'Financeiro', path: '/financeiro', roles: ['ADMIN'] },
  { icon: FolderOpen, label: 'Arquivos', path: '/arquivos', roles: ['ADMIN', 'ATTENDANT'] },
  { icon: Mail, label: 'Mensagens', path: '/mensagens', roles: ['ADMIN', 'ATTENDANT'] },
  { icon: MessageSquare, label: 'Chat', path: '/chat', roles: ['ADMIN', 'ATTENDANT'] },
  { icon: FileText, label: 'Relatórios', path: '/relatorios', roles: ['ADMIN', 'ATTENDANT'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    window.location.href = '/login';
  };

  // Filtrar itens do menu baseado no role do usuário
  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="h-screen w-20 bg-[#1a5d3a] flex flex-col items-center py-6 fixed left-0 top-0 z-50">
      {/* Logo/Icon */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
          <span className="text-2xl">🌭</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-4">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                isActive
                  ? "bg-yellow-400 text-[#1a5d3a]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              title={item.label}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        title="Sair"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
}

