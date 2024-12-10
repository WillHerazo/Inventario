import { format } from 'date-fns';
import type { Supplier } from '@/lib/types';

export const supplierColumns = [
  {
    header: 'Name',
    accessorKey: 'name' as keyof Supplier,
  },
  {
    header: 'Contact',
    accessorKey: 'contact' as keyof Supplier,
  },
  {
    header: 'Email',
    accessorKey: 'email' as keyof Supplier,
  },
  {
    header: 'Phone',
    accessorKey: 'phone' as keyof Supplier,
  },
  {
    header: 'Address',
    accessorKey: 'address' as keyof Supplier,
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt' as keyof Supplier,
    cell: (value: Date) => format(new Date(value), 'MMM d, yyyy'),
  },
];