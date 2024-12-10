import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInventory } from '@/context/InventoryContext';
import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';

const typeIcons = {
  IN: <ArrowUpCircle className="h-4 w-4 text-green-500" />,
  OUT: <ArrowDownCircle className="h-4 w-4 text-red-500" />,
  UPDATE: <RefreshCw className="h-4 w-4 text-blue-500" />,
};

export function RecentMovements() {
  const { state } = useInventory();
  const { movements, products } = state;

  const recentMovements = movements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Movements</CardTitle>
        <CardDescription>Latest inventory changes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMovements.map((movement) => {
              const product = products.find((p) => p.id === movement.productId);
              return (
                <TableRow key={movement.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {typeIcons[movement.type]}
                      {movement.type}
                    </div>
                  </TableCell>
                  <TableCell>{product?.name || 'Unknown Product'}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>
                    {format(new Date(movement.date), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}