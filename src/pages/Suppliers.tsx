import { useState } from 'react';
import { useInventory } from '@/context/InventoryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/shared/DataTable';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import type { Supplier } from '@/lib/types';
import { supplierColumns } from '@/components/suppliers/columns';

export function Suppliers() {
  const { state, dispatch } = useInventory();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredSuppliers = state.suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (supplier: Supplier) => {
    if (supplier.id) {
      dispatch({ type: 'UPDATE_SUPPLIER', payload: supplier });
    } else {
      dispatch({
        type: 'ADD_SUPPLIER',
        payload: {
          ...supplier,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      });
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <DataTable
        columns={supplierColumns}
        data={filteredSuppliers}
        onDelete={(id) => dispatch({ type: 'DELETE_SUPPLIER', payload: id })}
        onEdit={(supplier) => {
          dispatch({ type: 'UPDATE_SUPPLIER', payload: supplier });
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <SupplierForm onSave={handleSave} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}