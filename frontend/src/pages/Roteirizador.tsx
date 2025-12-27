import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  Package, 
  Route,
  CheckCircle2,
  AlertCircle,
  Truck,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados mockados de pedidos
interface Order {
  id: string;
  platform: 'IFOOD' | 'ANOTA_AI';
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  latitude: number;
  longitude: number;
  status: 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY';
  totalAmount: number;
  estimatedTime: number; // minutos
  createdAt: Date;
  items: Array<{ name: string; quantity: number }>;
}

const mockOrders: Order[] = [
  {
    id: '1',
    platform: 'IFOOD',
    customerName: 'João Silva',
    customerPhone: '(47) 99999-1111',
    customerAddress: 'Rua das Flores, 123 - Centro, Itajaí - SC',
    latitude: -26.9074,
    longitude: -48.6614,
    status: 'READY',
    totalAmount: 45.90,
    estimatedTime: 15,
    createdAt: new Date(Date.now() - 20 * 60000), // 20 min atrás
    items: [
      { name: 'Hot Dog Completo', quantity: 2 },
      { name: 'Coca-Cola 350ml', quantity: 2 }
    ]
  },
  {
    id: '2',
    platform: 'ANOTA_AI',
    customerName: 'Maria Santos',
    customerPhone: '(47) 99999-2222',
    customerAddress: 'Av. Beira Rio, 456 - Cidade Nova, Itajaí - SC',
    latitude: -26.9120,
    longitude: -48.6550,
    status: 'PREPARING',
    totalAmount: 32.50,
    estimatedTime: 25,
    createdAt: new Date(Date.now() - 10 * 60000), // 10 min atrás
    items: [
      { name: 'Hot Dog Simples', quantity: 1 },
      { name: 'Batata Frita', quantity: 1 },
      { name: 'Guaraná 350ml', quantity: 1 }
    ]
  },
  {
    id: '3',
    platform: 'IFOOD',
    customerName: 'Pedro Oliveira',
    customerPhone: '(47) 99999-3333',
    customerAddress: 'Rua XV de Novembro, 789 - Centro, Itajaí - SC',
    latitude: -26.9050,
    longitude: -48.6580,
    status: 'CONFIRMED',
    totalAmount: 67.80,
    estimatedTime: 30,
    createdAt: new Date(Date.now() - 5 * 60000), // 5 min atrás
    items: [
      { name: 'Hot Dog Completo', quantity: 3 },
      { name: 'Batata Frita', quantity: 2 },
      { name: 'Coca-Cola 2L', quantity: 1 }
    ]
  },
  {
    id: '4',
    platform: 'ANOTA_AI',
    customerName: 'Ana Costa',
    customerPhone: '(47) 99999-4444',
    customerAddress: 'Rua Hercílio Luz, 321 - Fazenda, Itajaí - SC',
    latitude: -26.9150,
    longitude: -48.6620,
    status: 'READY',
    totalAmount: 28.90,
    estimatedTime: 20,
    createdAt: new Date(Date.now() - 15 * 60000), // 15 min atrás
    items: [
      { name: 'Hot Dog Simples', quantity: 2 },
      { name: 'Água 500ml', quantity: 2 }
    ]
  },
  {
    id: '5',
    platform: 'IFOOD',
    customerName: 'Carlos Mendes',
    customerPhone: '(47) 99999-5555',
    customerAddress: 'Av. Osvaldo Reis, 654 - São Vicente, Itajaí - SC',
    latitude: -26.9100,
    longitude: -48.6500,
    status: 'OUT_FOR_DELIVERY',
    totalAmount: 55.00,
    estimatedTime: 5,
    createdAt: new Date(Date.now() - 35 * 60000), // 35 min atrás
    items: [
      { name: 'Hot Dog Completo', quantity: 4 },
      { name: 'Batata Frita', quantity: 2 }
    ]
  }
];

const statusConfig = {
  CONFIRMED: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  PREPARING: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  READY: { label: 'Pronto', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  OUT_FOR_DELIVERY: { label: 'Saiu para Entrega', color: 'bg-purple-100 text-purple-800', icon: Truck },
};

const platformConfig = {
  IFOOD: { label: 'iFood', color: 'bg-red-100 text-red-800' },
  ANOTA_AI: { label: 'Anota.AI', color: 'bg-orange-100 text-orange-800' },
};

export function Roteirizador() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(mockOrders[0]);
  const [mapCenter, setMapCenter] = useState({ lat: -26.9074, lng: -48.6614 });

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setMapCenter({ lat: order.latitude, lng: order.longitude });
  };

  const getGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const readyOrders = mockOrders.filter(o => o.status === 'READY');
  const preparingOrders = mockOrders.filter(o => o.status === 'PREPARING');
  const confirmedOrders = mockOrders.filter(o => o.status === 'CONFIRMED');
  const inDeliveryOrders = mockOrders.filter(o => o.status === 'OUT_FOR_DELIVERY');

  return (
    <div className="p-6 ml-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Roteirizador de Entregas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e otimize as rotas de entrega
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Zap size={18} />
            Otimizar Rotas
          </Button>
          <Button className="gap-2 bg-primary">
            <Route size={18} />
            Criar Rota
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prontos</p>
                <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparando</p>
                <p className="text-2xl font-bold text-yellow-600">{preparingOrders.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Package className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
                <p className="text-2xl font-bold text-blue-600">{confirmedOrders.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <AlertCircle className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Entrega</p>
                <p className="text-2xl font-bold text-purple-600">{inDeliveryOrders.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Truck className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Map and Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Pendentes</CardTitle>
              <CardDescription>
                {mockOrders.length} pedidos aguardando roteirização
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {mockOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <div
                      key={order.id}
                      onClick={() => handleOrderSelect(order)}
                      className={`p-4 border-b cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={platformConfig[order.platform].color}>
                            {platformConfig[order.platform].label}
                          </Badge>
                          <Badge className={statusConfig[order.status].color}>
                            <StatusIcon size={12} className="mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          R$ {order.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <User size={14} className="text-muted-foreground" />
                          <span className="font-medium">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          <span className="truncate">{order.customerAddress}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={14} />
                          <span>
                            {formatDistanceToNow(order.createdAt, { addSuffix: true, locale: ptBR })}
                          </span>
                          <span className="mx-1">•</span>
                          <span>~{order.estimatedTime} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone size={14} />
                          <a 
                            href={`tel:${order.customerPhone}`}
                            className="hover:text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {order.customerPhone}
                          </a>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Google Maps */}
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Entregas</CardTitle>
              <CardDescription>
                Visualize a localização dos pedidos no mapa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-lg overflow-hidden border bg-gray-100 relative">
                {/* Placeholder do Google Maps - Substitua pela integração real */}
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${selectedOrder?.latitude || mapCenter.lat},${selectedOrder?.longitude || mapCenter.lng}&zoom=14`}
                />
                {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-center p-4">
                      <MapPin size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Configure VITE_GOOGLE_MAPS_API_KEY no .env
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Por enquanto, usando mapa estático
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {selectedOrder && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detalhes do Pedido</CardTitle>
                    <CardDescription>Pedido #{selectedOrder.id}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={platformConfig[selectedOrder.platform].color}>
                      {platformConfig[selectedOrder.platform].label}
                    </Badge>
                    <Badge className={statusConfig[selectedOrder.status].color}>
                      {statusConfig[selectedOrder.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Cliente</p>
                    <p className="font-semibold">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Telefone</p>
                    <a 
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {selectedOrder.customerPhone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Endereço de Entrega</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{selectedOrder.customerAddress}</p>
                      <a
                        href={getGoogleMapsUrl(selectedOrder.latitude, selectedOrder.longitude)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                      >
                        Abrir no Google Maps →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Itens do Pedido</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{item.quantity}x {item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time and Amount */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Tempo Estimado</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span className="font-semibold">~{selectedOrder.estimatedTime} minutos</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor Total</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {selectedOrder.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(`tel:${selectedOrder.customerPhone}`, '_self')}
                  >
                    <Phone size={18} className="mr-2" />
                    Ligar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(getGoogleMapsUrl(selectedOrder.latitude, selectedOrder.longitude), '_blank')}
                  >
                    <MapPin size={18} className="mr-2" />
                    Navegar
                  </Button>
                  {selectedOrder.status === 'READY' && (
                    <Button className="flex-1 bg-primary">
                      <Truck size={18} className="mr-2" />
                      Atribuir Motoboy
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
