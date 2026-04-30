import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Package, AlertTriangle, TrendingUp, DollarSign, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  averageCost: number;
  createdAt: string;
  updatedAt: string;
}

export function Estoque() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    currentStock: '',
    minStock: '',
    averageCost: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar insumos
  const loadIngredients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ingredients');
      setIngredients(response.data);
      setError(null);
    } catch (err: unknown) {
      console.error('Erro ao carregar insumos:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Erro ao carregar insumos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post('/ingredients', {
        name: formData.name,
        unit: formData.unit,
        currentStock: parseFloat(formData.currentStock) || 0,
        minStock: parseFloat(formData.minStock) || 0,
        averageCost: formData.averageCost ? parseFloat(formData.averageCost) : undefined,
      });

      // Limpar formulário e fechar dialog
      setFormData({
        name: '',
        unit: '',
        currentStock: '',
        minStock: '',
        averageCost: '',
      });
      setIsDialogOpen(false);
      
      // Recarregar lista
      await loadIngredients();
    } catch (err: unknown) {
      console.error('Erro ao criar insumo:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Erro ao criar insumo');
    } finally {
      setSubmitting(false);
    }
  };

  // Verificar se estoque está abaixo do mínimo
  const isLowStock = (ingredient: Ingredient) => {
    return Number(ingredient.currentStock) < Number(ingredient.minStock);
  };

  // Calcular estatísticas
  const totalIngredients = ingredients.length;
  const lowStockCount = ingredients.filter(isLowStock).length;
  const totalValue = ingredients.reduce((sum, ing) => sum + (Number(ing.currentStock) * Number(ing.averageCost)), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 ml-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestão de Estoque
          </h1>
          <p className="text-muted-foreground text-base">
            Gerencie os insumos e controle o estoque de forma eficiente
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Plus size={18} />
              Adicionar Insumo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <DialogHeader className="space-y-3 pb-4 border-b">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Adicionar Novo Insumo
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                Preencha os dados do insumo. Campos obrigatórios estão marcados com <span className="text-destructive font-semibold">*</span>.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 py-6">
                <div className="grid gap-2.5">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Nome do Insumo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Pão de Hot Dog"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="grid gap-2.5">
                  <Label htmlFor="unit" className="text-sm font-semibold text-gray-700">
                    Unidade de Medida <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="unit"
                    placeholder="Ex: kg, unidade, litro"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    required
                    className="h-11 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2.5">
                    <Label htmlFor="currentStock" className="text-sm font-semibold text-gray-700">
                      Estoque Atual <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="currentStock"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.currentStock}
                      onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                      required
                      className="h-11 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="grid gap-2.5">
                    <Label htmlFor="minStock" className="text-sm font-semibold text-gray-700">
                      Estoque Mínimo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="minStock"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.minStock}
                      onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      required
                      className="h-11 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="grid gap-2.5">
                  <Label htmlFor="averageCost" className="text-sm font-semibold text-gray-700">
                    Custo Médio <span className="text-gray-400 text-xs font-normal">(opcional)</span>
                  </Label>
                  <Input
                    id="averageCost"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.averageCost}
                    onChange={(e) => setFormData({ ...formData, averageCost: e.target.value })}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                {error && (
                  <div className="text-sm text-destructive bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {error}
                  </div>
                )}
              </div>
              <DialogFooter className="gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={submitting}
                  className="h-11 px-6"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="h-11 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Adicionar
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total de Insumos</p>
                <p className="text-3xl font-bold text-gray-900">{totalIngredients}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Package className="text-primary" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Estoque Baixo</p>
                <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200/50 flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {totalValue.toFixed(2)}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200/50 flex items-center justify-center">
                <DollarSign className="text-green-600" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Insumos */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Insumos Cadastrados</CardTitle>
              <CardDescription className="text-base mt-1">
                {ingredients.length} {ingredients.length === 1 ? 'insumo cadastrado' : 'insumos cadastrados'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Carregando insumos...</p>
              </div>
            </div>
          ) : error && ingredients.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-red-600" size={32} />
                </div>
                <div className="space-y-2">
                  <p className="text-destructive font-semibold text-lg">{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={loadIngredients}
                  >
                    Tentar Novamente
                  </Button>
                </div>
              </div>
            </div>
          ) : ingredients.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto">
                  <Package className="text-gray-400" size={40} />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700 font-semibold text-lg">Nenhum insumo cadastrado</p>
                  <p className="text-sm text-muted-foreground">
                    Clique em "Adicionar Insumo" para começar a gerenciar seu estoque
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                    <th className="text-left p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Nome</th>
                    <th className="text-left p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Unidade</th>
                    <th className="text-right p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Estoque Atual</th>
                    <th className="text-right p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Estoque Mínimo</th>
                    <th className="text-right p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Custo Médio</th>
                    <th className="text-center p-5 font-bold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ingredients.map((ingredient, index) => {
                    const lowStock = isLowStock(ingredient);
                    return (
                      <tr
                        key={ingredient.id}
                        className={`transition-all duration-200 ${
                          lowStock
                            ? 'bg-gradient-to-r from-red-50/50 to-red-50/30 hover:from-red-100/50 hover:to-red-100/30 border-l-4 border-l-red-500'
                            : 'hover:bg-gray-50/50 border-l-4 border-l-transparent'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className={`p-5 font-semibold ${lowStock ? 'text-red-900' : 'text-gray-900'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${lowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                            {ingredient.name}
                          </div>
                        </td>
                        <td className="p-5 text-muted-foreground font-medium">{ingredient.unit}</td>
                        <td className={`p-5 text-right font-bold text-lg ${lowStock ? 'text-red-600' : 'text-gray-900'}`}>
                          {Number(ingredient.currentStock).toFixed(2)} <span className="text-sm font-normal text-muted-foreground">{ingredient.unit}</span>
                        </td>
                        <td className="p-5 text-right text-muted-foreground font-medium">
                          {Number(ingredient.minStock).toFixed(2)} <span className="text-sm">{ingredient.unit}</span>
                        </td>
                        <td className="p-5 text-right">
                          <span className="font-semibold text-gray-900">R$ {Number(ingredient.averageCost).toFixed(2)}</span>
                        </td>
                        <td className="p-5 text-center">
                          {lowStock ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300/50 shadow-sm">
                              <AlertTriangle size={14} />
                              Estoque Baixo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300/50 shadow-sm">
                              <TrendingUp size={14} />
                              Normal
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
