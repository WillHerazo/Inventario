import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useInventory } from '@/context/InventoryContext';

export function InventoryChart() {
  const { state } = useInventory();
  const { movements } = state;

  // Procesar datos para el gráfico
  const chartData = movements
    .reduce((acc: any[], movement) => {
      const date = new Date(movement.date).toLocaleDateString();
      const existingData = acc.find((item) => item.date === date);

      if (existingData) {
        if (movement.type === 'IN') {
          existingData.in += movement.quantity;
        } else if (movement.type === 'OUT') {
          existingData.out += movement.quantity;
        }
      } else {
        acc.push({
          date,
          in: movement.type === 'IN' ? movement.quantity : 0,
          out: movement.type === 'OUT' ? movement.quantity : 0,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Inventory Movement</CardTitle>
        <CardDescription>
          Stock movement over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="in"
              stroke="#4ade80"
              fill="#4ade80"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Stock In"
            />
            <Area
              type="monotone"
              dataKey="out"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.2}
              strokeWidth={2}
              name="Stock Out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}