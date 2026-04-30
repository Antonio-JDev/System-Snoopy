import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { format, parseISO, isPast, isToday, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  scheduledDate: string | null;
  status: 'pending' | 'paid' | 'scheduled';
  category: string;
  createdAt: string;
  paidAt: string | null;
}

export function Financeiro() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      description: 'Fornecedor de Pães',
      amount: 3500.00,
      dueDate: '2025-01-25',
      scheduledDate: '2025-01-24',
      status: 'scheduled',
      category: 'Fornecedores',
      createdAt: '2025-01-10',
      paidAt: null,
    },
    {
      id: '2',
      description: 'Aluguel do Estabelecimento',
      amount: 8500.00,
      dueDate: '2025-01-30',
      scheduledDate: null,
      status: 'pending',
      category: 'Despesas Fixas',
      createdAt: '2025-01-05',
      paidAt: null,
    },
    {
      id: '3',
      description: 'Energia Elétrica',
      amount: 1200.00,
      dueDate: '2025-01-20',
      scheduledDate: null,
      status: 'pending',
      category: 'Utilidades',
      createdAt: '2025-01-15',
      paidAt: null,
    },
    {
      id: '4',
      description: 'Fornecedor de Carnes',
      amount: 5200.00,
      dueDate: '2025-01-18',
      scheduledDate: '2025-01-18',
      status: 'paid',
      category: 'Fornecedores',
      createdAt: '2025-01-10',
      paidAt: '2025-01-18',
    },
    {
      id: '5',
      description: 'Salários - Janeiro',
      amount: 15000.00,
      dueDate: '2025-01-05',
      scheduledDate: '2025-01-05',
      status: 'paid',
      category: 'Folha de Pagamento',
      createdAt: '2024-12-28',
      paidAt: '2025-01-05',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    dueDate: '',
    scheduledDate: '',
    category: '',
  });

  const pendingBills = bills.filter((bill) => bill.status !== 'paid');
  const paidBills = bills.filter((bill) => bill.status === 'paid');

  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = paidBills.reduce((sum, bill) => sum + bill.amount, 0);

  const handleOpenDialog = (bill?: Bill) => {
    if (bill) {
      setEditingBill(bill);
      setFormData({
        description: bill.description,
        amount: bill.amount.toString(),
        dueDate: bill.dueDate,
        scheduledDate: bill.scheduledDate || '',
        category: bill.category,
      });
    } else {
      setEditingBill(null);
      setFormData({
        description: '',
        amount: '',
        dueDate: '',
        scheduledDate: '',
        category: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBill(null);
    setFormData({
      description: '',
      amount: '',
      dueDate: '',
      scheduledDate: '',
      category: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBill) {
      // Editar conta existente
      setBills(
        bills.map((bill) =>
          bill.id === editingBill.id
            ? {
                ...bill,
                description: formData.description,
                amount: parseFloat(formData.amount),
                dueDate: formData.dueDate,
                scheduledDate: formData.scheduledDate || null,
                status: formData.scheduledDate ? 'scheduled' : 'pending',
                category: formData.category,
              }
            : bill
        )
      );
    } else {
      // Criar nova conta
      const newBill: Bill = {
        id: Date.now().toString(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        scheduledDate: formData.scheduledDate || null,
        status: formData.scheduledDate ? 'scheduled' : 'pending',
        category: formData.category,
        createdAt: new Date().toISOString().split('T')[0],
        paidAt: null,
      };
      setBills([...bills, newBill]);
    }
    
    handleCloseDialog();
  };

  const handleSchedulePayment = (billId: string, scheduledDate: string) => {
    setBills(
      bills.map((bill) =>
        bill.id === billId
          ? { ...bill, scheduledDate, status: 'scheduled' as const }
          : bill
      )
    );
  };

  const handleMarkAsPaid = (billId: string) => {
    setBills(
      bills.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              status: 'paid' as const,
              paidAt: new Date().toISOString().split('T')[0],
            }
          : bill
      )
    );
  };

  const handleDelete = (billId: string) => {
    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      setBills(bills.filter((bill) => bill.id !== billId));
    }
  };

  const getStatusBadge = (bill: Bill) => {
    if (bill.status === 'paid') {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Pago
        </Badge>
      );
    }
    
    if (bill.status === 'scheduled') {
      return (
        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
          <Calendar className="w-3 h-3 mr-1" />
          Agendado
        </Badge>
      );
    }

    const dueDate = parseISO(bill.dueDate);
    const daysUntilDue = differenceInDays(dueDate, new Date());

    if (isPast(dueDate) && !isToday(dueDate)) {
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Atrasado
        </Badge>
      );
    }

    if (daysUntilDue <= 3) {
      return (
        <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">
          <Clock className="w-3 h-3 mr-1" />
          Vence em breve
        </Badge>
      );
    }

    return (
      <Badge variant="outline">
        <Clock className="w-3 h-3 mr-1" />
        Pendente
      </Badge>
    );
  };

  const BillCard = ({ bill }: { bill: Bill }) => {
    const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(bill.scheduledDate || '');

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{bill.description}</h3>
                {getStatusBadge(bill)}
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-lg font-bold text-foreground">
                    R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Vencimento: {format(parseISO(bill.dueDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                {bill.scheduledDate && (
                  <p className="flex items-center gap-2 text-blue-600">
                    <Calendar className="w-4 h-4" />
                    Agendado para: {format(parseISO(bill.scheduledDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                )}
                {bill.paidAt && (
                  <p className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Pago em: {format(parseISO(bill.paidAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                )}
                <p className="text-xs bg-primary/10 text-primary inline-block px-2 py-1 rounded">
                  {bill.category}
                </p>
              </div>
            </div>
            {bill.status !== 'paid' && (
              <div className="flex flex-col gap-2 ml-4">
                <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agendar Pagamento</DialogTitle>
                      <DialogDescription>
                        Defina a data em que deseja realizar o pagamento desta conta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="schedule-date">Data do Pagamento</Label>
                        <Input
                          id="schedule-date"
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsScheduleDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          if (scheduleDate) {
                            handleSchedulePayment(bill.id, scheduleDate);
                            setIsScheduleDialogOpen(false);
                          }
                        }}
                      >
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleMarkAsPaid(bill.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marcar Pago
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(bill)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(bill.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 ml-20 space-y-6">
      {/* Header com Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">Total a Pagar</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8" />
              R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100 text-sm">
              {pendingBills.length} {pendingBills.length === 1 ? 'conta pendente' : 'contas pendentes'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-100">Total Pago</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8" />
              R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-100 text-sm">
              {paidBills.length} {paidBills.length === 1 ? 'conta paga' : 'contas pagas'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardDescription className="text-orange-100">Saldo Total</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="w-8 h-8" />
              R$ {(totalPending + totalPaid).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-100 text-sm">Movimentação do período</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para Contas a Pagar e Pagas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão Financeira</CardTitle>
              <CardDescription>Gerencie suas contas a pagar e histórico de pagamentos</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingBill ? 'Editar Conta' : 'Nova Conta a Pagar'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingBill
                      ? 'Atualize as informações da conta.'
                      : 'Adicione uma nova conta a pagar ao sistema.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        placeholder="Ex: Fornecedor de Pães"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Data de Vencimento</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, dueDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Data Agendada (Opcional)</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) =>
                          setFormData({ ...formData, scheduledDate: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Input
                        id="category"
                        placeholder="Ex: Fornecedores, Utilidades, etc."
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseDialog}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingBill ? 'Salvar Alterações' : 'Criar Conta'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">
                <Clock className="w-4 h-4 mr-2" />
                Contas a Pagar ({pendingBills.length})
              </TabsTrigger>
              <TabsTrigger value="paid">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Contas Pagas ({paidBills.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingBills.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma conta a pagar no momento.</p>
                </div>
              ) : (
                pendingBills
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((bill) => <BillCard key={bill.id} bill={bill} />)
              )}
            </TabsContent>
            <TabsContent value="paid" className="space-y-4 mt-6">
              {paidBills.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma conta paga ainda.</p>
                </div>
              ) : (
                paidBills
                  .sort((a, b) => new Date(b.paidAt!).getTime() - new Date(a.paidAt!).getTime())
                  .map((bill) => <BillCard key={bill.id} bill={bill} />)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
