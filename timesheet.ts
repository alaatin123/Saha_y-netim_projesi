export interface TimesheetEntry {
  id: string;
  userId: string;
  projectId: string;
  disciplineId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'checked_in' | 'checked_out' | 'approved' | 'rejected';
  approvedBy?: string;
  totalHours?: number;
  notes?: string;
  breakDuration?: number;
}

export interface IncidentReport {
  id: string;
  reporterId: string;
  projectId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'safety' | 'quality' | 'delay' | 'equipment' | 'other';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos: string[];
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
}