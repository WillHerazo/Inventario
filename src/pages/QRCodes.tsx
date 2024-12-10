import { useState } from 'react';
import { useInventory } from '@/context/InventoryContext';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Search } from 'lucide-react';

export function QRCodes() {
  const { state } = useInventory();
  const [search, setSearch] = useState('');

  const filteredProducts = state.products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const downloadQR = (productId: string) => {
    const canvas = document.getElementById(`qr-${productId}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${productId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">QR Codes</h2>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <QRCodeSVG
                id={`qr-${product.id}`}
                value={JSON.stringify({
                  id: product.id,
                  name: product.name,
                  quantity: product.quantity,
                })}
                size={200}
                level="H"
                includeMargin
              />
              <Button onClick={() => downloadQR(product.id)}>
                Download QR Code
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}