import { useInventory } from '@/context/InventoryContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';

const typeIcons = {
  IN: <ArrowUpCircle className="h-4 w-4 text-green-500" />,
  OUT: <ArrowDownCircle className="h-4 w-4 text-red-500" />,
  UPDATE: <RefreshCw className="h-4 w-4 text-blue-500" />,
};

export function History() {
  const { state } = useInventory();
  const { movements, products } = state;

  const sortedMovements = [...movements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Movement History</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMovements.map((movement) => {
              const product = products.find((p) => p.id === movement.productId);
              return (
                <TableRow key={movement.id}>
                  <TableCell>
                    {format(new Date(movement.date), 'MMM d, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {typeIcons[movement.type]}
                      {movement.type}
                    </div>
                  </TableCell>
                  <TableCell>{product?.name || 'Unknown Product'}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.notes || '-'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}