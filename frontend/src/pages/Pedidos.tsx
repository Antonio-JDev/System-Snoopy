import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Pedidos() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>Gerencie todos os pedidos do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de pedidos em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

