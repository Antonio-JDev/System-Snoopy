import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Mensagens() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Mensagens</CardTitle>
          <CardDescription>Visualize suas mensagens</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de mensagens em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

