# Página de Roteirizador - Funcionalidades

## ✅ Implementado

### 1. **Dados Mockados**
- 5 pedidos de exemplo com dados realistas
- Pedidos do iFood e Anota.AI
- Diferentes status (Confirmado, Preparando, Pronto, Em Entrega)
- Coordenadas geográficas de Itajaí-SC

### 2. **Interface Visual**
- Cards de estatísticas (Prontos, Preparando, Confirmados, Em Entrega)
- Lista de pedidos com scroll
- Mapa do Google Maps integrado
- Painel de detalhes do pedido selecionado

### 3. **Informações dos Pedidos**
- ✅ Nome do cliente
- ✅ Telefone (clicável para ligar)
- ✅ Endereço completo
- ✅ Status com badges coloridos
- ✅ Plataforma (iFood/Anota.AI)
- ✅ Valor total
- ✅ Tempo estimado de entrega
- ✅ Tempo desde criação do pedido
- ✅ Lista de itens do pedido

### 4. **Mapa do Google Maps**
- Integração via iframe (Google Maps Embed API)
- Centraliza no pedido selecionado
- Link para abrir no Google Maps completo
- Funciona sem API key (modo estático) ou com API key (modo interativo)

### 5. **Funcionalidades Interativas**
- Clique no pedido para ver no mapa
- Botão para ligar para o cliente
- Botão para navegar (abre Google Maps)
- Botão para atribuir motoboy (quando pedido está pronto)
- Botões de otimização de rotas

### 6. **Design Moderno**
- Cores do tema (amarelo/vermelho suave)
- Cards com sombras e bordas arredondadas
- Badges coloridos por status e plataforma
- Ícones do Lucide React
- Layout responsivo

## 🎨 Elementos Visuais

### Status dos Pedidos
- **Confirmado**: Azul (AlertCircle)
- **Preparando**: Amarelo (Package)
- **Pronto**: Verde (CheckCircle2)
- **Em Entrega**: Roxo (Truck)

### Plataformas
- **iFood**: Vermelho
- **Anota.AI**: Laranja

## 📍 Localizações Mockadas

Todos os pedidos estão em Itajaí-SC:
- Centro
- Cidade Nova
- Fazenda
- São Vicente

## 🔧 Configuração do Google Maps

Para usar o mapa interativo, adicione no `.env` do frontend:

```env
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

Sem a chave, o mapa ainda funciona em modo estático.

## 🚀 Próximas Melhorias

1. Integração real com API de pedidos
2. Algoritmo de otimização de rotas
3. Agrupamento automático por proximidade
4. Atribuição de motoboys
5. Tracking em tempo real

