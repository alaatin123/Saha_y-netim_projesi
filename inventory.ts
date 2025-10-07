export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  code: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  unitPrice: number;
  location: string;
  supplier?: string;
  lastUpdated: string;
  status: 'available' | 'low_stock' | 'out_of_stock';
}

export interface MaterialRequest {
  id: string;
  requesterId: string;
  disciplineId: string;
  items: RequestItem[];
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  priority: 'normal' | 'urgent';
  requestDate: string;
  notes?: string;
  approvedBy?: string;
  approvalDate?: string;
}

export interface RequestItem {
  itemId: string;
  quantity: number;
  urgency: 'normal' | 'urgent';
  notes?: string;
}

export interface MaterialAllocation {
  id: string;
  itemId: string;
  quantity: number;
  allocatedTo: string;
  allocatedBy: string;
  allocationDate: string;
  returnDate?: string;
  status: 'allocated' | 'returned' | 'lost';
  notes?: string;
}