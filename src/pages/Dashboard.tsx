import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { InventoryChart } from '@/components/dashboard/InventoryChart';
import { RecentMovements } from '@/components/dashboard/RecentMovements';

export function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4">
        <DashboardStats />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InventoryChart />
          <RecentMovements />
        </div>
      </div>
    </div>
  );
}