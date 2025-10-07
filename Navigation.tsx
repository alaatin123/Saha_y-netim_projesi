import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  ClipboardList, 
  Package, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Construction,
  CheckCircle,
  Clock,
  AlertTriangle,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_PERMISSIONS } from '../../types/auth';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Ana Sayfa', icon: Home },
          { id: 'projects', label: 'Projeler', icon: Construction },
          { id: 'users', label: 'Kullanıcılar', icon: Users },
          { id: 'reports', label: 'Raporlar', icon: BarChart3 },
          { id: 'announcements', label: 'Duyurular', icon: Megaphone },
          { id: 'messages', label: 'Mesajlar', icon: MessageSquare }
        ];
      case 'discipline_chief':
        return [
          { id: 'dashboard', label: 'Ana Sayfa', icon: Home },
          { id: 'work-plans', label: 'İş Planları', icon: ClipboardList },
          { id: 'tasks', label: 'Görev Yönetimi', icon: CheckCircle },
          { id: 'teams', label: 'Ekipler', icon: Users },
          { id: 'materials', label: 'Malzeme Talepleri', icon: Package },
          { id: 'reports', label: 'Raporlar', icon: BarChart3 },
          { id: 'messages', label: 'İletişim', icon: MessageSquare },
          { id: 'announcements', label: 'Duyurular', icon: Megaphone }
        ];
      case 'warehouse_manager':
        return [
          { id: 'dashboard', label: 'Ana Sayfa', icon: Home },
          { id: 'inventory', label: 'Envanter', icon: Package },
          { id: 'requests', label: 'Talepler', icon: ClipboardList },
          { id: 'transfers', label: 'Transferler', icon: BarChart3 },
          { id: 'messages', label: 'Mesajlar', icon: MessageSquare },
          { id: 'announcements', label: 'Duyurular', icon: Megaphone }
        ];
      case 'team_leader':
        return [
          { id: 'dashboard', label: 'Ana Sayfa', icon: Home },
          { id: 'tasks', label: 'Görevler', icon: ClipboardList },
          { id: 'materials', label: 'Malzeme', icon: Package },
          { id: 'messages', label: 'İletişim', icon: MessageSquare },
          { id: 'announcements', label: 'Duyurular', icon: Megaphone }
        ];
      case 'team_member':
        return [
          { id: 'dashboard', label: 'Ana Sayfa', icon: Home },
          { id: 'timesheet', label: 'Puantaj', icon: Clock },
          { id: 'incidents', label: 'Saha Tutanağı', icon: AlertTriangle },
          { id: 'progress', label: 'İlerleme Raporu', icon: BarChart3 },
          { id: 'messages', label: 'İletişim', icon: MessageSquare },
          { id: 'announcements', label: 'Duyurular', icon: Megaphone }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const NavItem: React.FC<{ item: any; mobile?: boolean }> = ({ item, mobile = false }) => (
    <button
      onClick={() => {
        onViewChange(item.id);
        if (mobile) setIsMobileMenuOpen(false);
      }}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
        currentView === item.id
          ? 'bg-orange-100 text-orange-700 shadow-md'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } ${mobile ? 'w-full text-left' : ''}`}
    >
      <item.icon className="w-5 h-5 mr-3" />
      {item.label}
    </button>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Construction className="w-8 h-8 text-orange-600 mr-3" />
          <h1 className="text-lg font-semibold text-gray-900">Şantiye Yönetimi</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Construction className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Şantiye Yönetimi</h1>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-orange-600">{ROLE_PERMISSIONS[user.role].name}</p>
          </div>
        </div>
        
        <nav className="p-6 space-y-2 flex-1">
          {navigationItems.map((item) => (
            <NavItem key={item.id} item={item} mobile />
          ))}
        </nav>
        
        <div className="p-6 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Construction className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Şantiye Yönetimi</h1>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-orange-600">{ROLE_PERMISSIONS[user.role].name}</p>
          </div>
        </div>
        
        <nav className="p-6 space-y-2 flex-1">
          {navigationItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </nav>
        
        <div className="p-6 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;