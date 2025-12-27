import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Estoque() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Estoque</CardTitle>
          <CardDescription>Gerencie o estoque de insumos e produtos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de estoque em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

