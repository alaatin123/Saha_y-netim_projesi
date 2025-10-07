export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  disciplines: Discipline[];
  progress: number;
  createdBy: string;
  createdAt: string;
}

export interface Discipline {
  id: string;
  name: string;
  projectId: string;
  chiefId?: string;
  teams: Team[];
  progress: number;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  disciplineId: string;
  leaderId?: string;
  members: TeamMember[];
  currentTask?: Task;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'leader' | 'member';
  joinedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  disciplineId: string;
  teamId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  assignedTo: string[];
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  attachments?: string[];
  progress: number;
  createdAt: string;
}