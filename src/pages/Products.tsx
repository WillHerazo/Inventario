import { useState } from 'react';
import { useInventory } from '@/context/InventoryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/shared/DataTable';
import { ProductForm } from '@/components/products/ProductForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import type { Product } from '@/lib/types';
import { productColumns } from '@/components/products/columns';

export function Products() {
  const { state, dispatch } = useInventory();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredProducts = state.products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (product: Product) => {
    if (product.id) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    } else {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          ...product,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <DataTable
        columns={productColumns}
        data={filteredProducts}
        onDelete={(id) => dispatch({ type: 'DELETE_PRODUCT', payload: id })}
        onEdit={(product) => {
          dispatch({ type: 'UPDATE_PRODUCT', payload: product });
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSave={handleSave} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}