export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'discipline_chief' | 'warehouse_manager' | 'team_leader' | 'team_member';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const ROLE_PERMISSIONS = {
  admin: {
    name: 'Yönetici',
    platform: 'Web',
    permissions: ['create_project', 'assign_disciplines', 'assign_chiefs', 'view_reports', 'publish_announcements']
  },
  discipline_chief: {
    name: 'Sınıf Şefi',
    platform: 'Web / Mobil',
    permissions: ['create_work_plan', 'assign_teams', 'approve_timesheet', 'manage_documents', 'request_materials', 'manage_virtual_warehouse', 'view_daily_reports']
  },
  warehouse_manager: {
    name: 'Depocu',
    platform: 'Web',
    permissions: ['manage_inventory', 'approve_requests', 'transfer_materials', 'track_stock', 'stock_alerts']
  },
  team_leader: {
    name: 'Ekip Başı',
    platform: 'Mobil',
    permissions: ['start_tasks', 'complete_tasks', 'allocate_materials', 'use_communication']
  },
  team_member: {
    name: 'Ekip Üyesi',
    platform: 'Mobil',
    permissions: ['location_timesheet', 'create_incident_reports', 'use_communication']
  }
};