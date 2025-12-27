import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Arquivos() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Arquivos</CardTitle>
          <CardDescription>Gerencie seus arquivos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de arquivos em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

