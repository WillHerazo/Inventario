import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { useInventory } from '@/context/InventoryContext';

export function DashboardStats() {
  const { state } = useInventory();
  const { products, suppliers } = state;

  const lowStockProducts = products.filter(
    (product) => product.quantity <= product.minimumStock
  );

  const totalStockValue = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      icon: Package,
      description: 'Products in inventory',
    },
    {
      name: 'Total Suppliers',
      value: suppliers.length,
      icon: Users,
      description: 'Active suppliers',
    },
    {
      name: 'Low Stock Items',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      description: 'Products below minimum stock',
    },
    {
      name: 'Total Stock Value',
      value: `$${totalStockValue.toLocaleString()}`,
      icon: TrendingUp,
      description: 'Current inventory value',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}