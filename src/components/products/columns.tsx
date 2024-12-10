import { format } from 'date-fns';
import type { Product } from '@/lib/types';

export const productColumns = [
  {
    header: 'Name',
    accessorKey: 'name' as keyof Product,
  },
  {
    header: 'Description',
    accessorKey: 'description' as keyof Product,
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity' as keyof Product,
  },
  {
    header: 'Location',
    accessorKey: 'location' as keyof Product,
  },
  {
    header: 'Supplier',
    accessorKey: 'supplier' as keyof Product,
  },
  {
    header: 'Last Updated',
    accessorKey: 'updatedAt' as keyof Product,
    cell: (value: Date) => format(new Date(value), 'MMM d, yyyy'),
  },
];