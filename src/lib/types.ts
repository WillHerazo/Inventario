export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  location: string;
  supplier: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'UPDATE';
  quantity: number;
  date: Date;
  notes?: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalSuppliers: number;
  lowStockItems: number;
  recentMovements: InventoryMovement[];
}