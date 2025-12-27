import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Logistica() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Logística</CardTitle>
          <CardDescription>Gerencie rotas e entregas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de logística em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

