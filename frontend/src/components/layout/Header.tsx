import { Search, Settings, Bell, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 ml-20">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Start typing to search..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Premium
        </Button>
        <Button variant="ghost" size="icon">
          <Grid size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

