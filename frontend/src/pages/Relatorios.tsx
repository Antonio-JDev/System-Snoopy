import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Relatorios() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
          <CardDescription>Visualize e exporte relatórios</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de relatórios em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

