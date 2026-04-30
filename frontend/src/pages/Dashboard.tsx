import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, CheckCircle2 } from 'lucide-react';

const financeData = {
  annualTaxes: 500580,
  nextTaxReview: '26 de Abril, 2025',
  averagePrice: 65.54,
  satisfactionRate: 68,
};

const visitorsData = [
  { day: '11', visitors: 1200 },
  { day: '12', visitors: 1900 },
  { day: '13', visitors: 3000 },
  { day: '14', visitors: 3867 },
  { day: '15', visitors: 2500 },
  { day: '16', visitors: 1800 },
  { day: '17', visitors: 2200 },
];

const activityData = [
  { date: '01/04', activity: 45 },
  { date: '02/04', activity: 52 },
  { date: '03/04', activity: 48 },
  { date: '04/04', activity: 61 },
  { date: '05/04', activity: 55 },
  { date: '06/04', activity: 58 },
  { date: '07/04', activity: 64 },
  { date: '08/04', activity: 50 },
  { date: '09/04', activity: 67 },
  { date: '10/04', activity: 59 },
  { date: '11/04', activity: 72 },
  { date: '12/04', activity: 65 },
];

const browserData = [
  { name: 'Chrome', value: 70, color: '#3b82f6' },
  { name: 'Firefox', value: 15, color: '#10b981' },
  { name: 'Opera', value: 10, color: '#f97316' },
  { name: 'Outros', value: 5, color: '#6b7280' },
];

const salesData = {
  totalSales: 5836,
  transactions: 7580,
  completedTransactions: 6584,
};

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 ml-20 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-base mt-1">
          Visão geral do seu negócio em tempo real
        </p>
      </div>

      {/* Finance Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-xl font-bold text-gray-900">Resumo Financeiro</CardTitle>
            <CardDescription className="text-base mt-1">Verifique cada coluna para mais detalhes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Impostos Anuais</p>
                <p className="text-2xl font-bold">R$ {financeData.annualTaxes.toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Próxima Revisão Fiscal</p>
                <p className="text-lg font-semibold">{financeData.nextTaxReview}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preço Médio do Produto</p>
                <p className="text-2xl font-bold">R$ {financeData.averagePrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{financeData.satisfactionRate}%</p>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                      style={{ width: `${financeData.satisfactionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">AI</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">LS</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">DO</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">RI</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">SA</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm cursor-pointer hover:bg-primary/20">
                VER MAIS +
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Unique Visitors Graph */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-xl font-bold text-gray-900">Gráfico de Visitantes Únicos</CardTitle>
            <CardDescription className="text-base mt-1">Verifique cada coluna para mais detalhes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="sales">Vendas</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="sales" className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Browser Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-xl font-bold text-gray-900">Atividade</CardTitle>
            <CardDescription className="text-base mt-1">Verifique cada coluna para mais detalhes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="sales">Vendas</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activity" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="sales" className="mt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="activity" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-xl font-bold text-gray-900">Atividade do Navegador</CardTitle>
            <CardDescription className="text-base mt-1">Verifique mais detalhes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {browserData.map((browser) => (
                <div key={browser.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{browser.name}</span>
                    <span className="text-muted-foreground">{browser.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${browser.value}%`, backgroundColor: browser.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total de Vendas</p>
                <p className="text-3xl font-bold text-blue-600">{salesData.totalSales.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200/50 flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Transações</p>
                <p className="text-3xl font-bold text-orange-600">+{salesData.transactions.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200/50 flex items-center justify-center">
                <ShoppingCart className="text-orange-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Transações Concluídas</p>
                <p className="text-3xl font-bold text-green-600">{salesData.completedTransactions.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200/50 flex items-center justify-center">
                <CheckCircle2 className="text-green-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

