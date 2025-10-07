import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import Navigation from './components/layout/Navigation';
import AdminDashboard from './components/dashboard/AdminDashboard';
import DisciplineChiefDashboard from './components/dashboard/DisciplineChiefDashboard';
import WarehouseManagerDashboard from './components/dashboard/WarehouseManagerDashboard';
import TeamLeaderDashboard from './components/dashboard/TeamLeaderDashboard';
import TeamMemberDashboard from './components/dashboard/TeamMemberDashboard';
import ProjectList from './components/projects/ProjectList';
import ProjectDetail from './components/projects/ProjectDetail';
import WorkPlanList from './components/workplan/WorkPlanList';
import TaskManagement from './components/workplan/TaskManagement';
import TimesheetManagement from './components/timesheet/TimesheetManagement';
import LocationTimesheet from './components/timesheet/LocationTimesheet';
import IncidentReporting from './components/reports/IncidentReporting';
import ProgressReporting from './components/reports/ProgressReporting';
import MessageCenter from './components/communication/MessageCenter';
import AnnouncementCenter from './components/communication/AnnouncementCenter';
import TeamManagement from './components/teams/TeamManagement';
import InventoryManagement from './components/inventory/InventoryManagement';
import UserManagement from './components/users/UserManagement';
import MaterialRequests from './components/materials/MaterialRequests';
import TransferManagement from './components/materials/TransferManagement';
import ComprehensiveReports from './components/reports/ComprehensiveReports';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'discipline_chief':
        return <DisciplineChiefDashboard />;
      case 'warehouse_manager':
        return <WarehouseManagerDashboard />;
      case 'team_leader':
        return <TeamLeaderDashboard />;
      case 'team_member':
        return <TeamMemberDashboard />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz</h1>
          </div>
        );
    }
  };

  const renderCurrentView = () => {
    if (currentView === 'dashboard') {
      return renderDashboard();
    }
    
    // Handle projects view for admin
    if (currentView === 'projects' && user?.role === 'admin') {
      if (selectedProjectId) {
        return (
          <ProjectDetail 
            projectId={selectedProjectId} 
            onBack={() => setSelectedProjectId(null)} 
          />
        );
      }
      return <ProjectList />;
    }
    
    // Handle work plans view for discipline chief
    if (currentView === 'work-plans' && user?.role === 'discipline_chief') {
      return <WorkPlanList />;
    }
    
    // Handle tasks view for discipline chief
    if (currentView === 'tasks' && user?.role === 'discipline_chief') {
      return <TaskManagement />;
    }
    
    // Handle timesheet view
    if (currentView === 'timesheet') {
      if (user?.role === 'team_member') {
        return <LocationTimesheet />;
      } else if (user?.role === 'discipline_chief' || user?.role === 'admin') {
        return <TimesheetManagement />;
      }
    }
    
    // Handle incident reporting view
    if (currentView === 'incidents') {
      return <IncidentReporting />;
    }
    
    // Handle progress reporting view
    if (currentView === 'progress') {
      return <ProgressReporting />;
    }
    
    // Handle messages view
    if (currentView === 'messages') {
      return <MessageCenter />;
    }
    
    // Handle announcements view
    if (currentView === 'announcements') {
      return <AnnouncementCenter />;
    }

    // Handle teams view
    if (currentView === 'teams') {
      return <TeamManagement />;
    }

    // Handle inventory view
    if (currentView === 'inventory') {
      return <InventoryManagement />;
    }

    // Handle users view (admin only)
    if (currentView === 'users' && user?.role === 'admin') {
      return <UserManagement />;
    }

    // Handle material requests view
    if (currentView === 'materials') {
      return <MaterialRequests />;
    }

    // Handle requests view (warehouse manager)
    if (currentView === 'requests') {
      return <MaterialRequests />;
    }

    // Handle transfers view (warehouse manager)
    if (currentView === 'transfers') {
      return <TransferManagement />;
    }

    // Handle reports view
    if (currentView === 'reports') {
      return <ComprehensiveReports />;
    }

    // Placeholder for other views
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
          <p className="text-gray-600">Bu bölüm geliştiriliyor...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="lg:pl-64">
        {renderCurrentView()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;