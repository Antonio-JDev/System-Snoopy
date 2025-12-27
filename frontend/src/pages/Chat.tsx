import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Chat() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Converse com sua equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página de chat em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

