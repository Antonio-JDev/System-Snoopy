import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Financeiro() {
  return (
    <div className="p-6 ml-20">
      <Card>
        <CardHeader>
          <CardTitle>Financeiro</CardTitle>
          <CardDescription>Gerencie o fluxo de caixa e transações</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Página financeira em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  );
}

