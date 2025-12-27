PRD Unificado: Sistema Snoopydog Lanches

1. Escopo do Projeto
Desenvolvimento de um ecossistema completo de gestão (ERP) e logística para a Snoopydog Lanches (Itajaí-SC). O sistema centraliza pedidos de plataformas externas, gerencia o estoque em nível de insumo e automatiza a roteirização de entregas com controle de fila de motoboys.

2. Pilares Técnicos (Stack)
Backend: Node.js + Express + TypeScript (Arquitetura Limpa).

Frontend Web: React + Tailwind CSS + Shadcn/UI (Painel Admin e Atendente).

Mobile: React Native + Expo (App do Motoboy).

Banco de Dados: PostgreSQL + Prisma ORM.

Infra: Docker + VPS Hostinger.

Integrações: iFood API, Anota.AI API, Google Maps API, API Fiscal (NFC-e).

3. Módulos e Regras de Negócio
3.1. Integração de Pedidos
Fluxo: Captura em tempo real via Webhooks/Polling.

Normalização: Converter o JSON do iFood e Anota.ai para o formato interno Order.

Status: Sincronizar status (Confirmado, Preparando, Saiu para Entrega, Entregue).

3.2. Gestão de Estoque & Ficha Técnica
Insumos vs. Produtos: Lanches são compostos por insumos (Pão, Carne, Salsicha).

Baixa Automática: Ao confirmar um pedido, o sistema percorre a Ficha Técnica e subtrai a quantidade exata de insumos do estoque.

Gestão de Compras: Registro de entradas (Compras) para cálculo de custo médio e histórico de fornecedores.

3.3. Logística e Roteirizador (CORE)
Algoritmo: Agrupar pedidos por proximidade geográfica usando Google Maps.

Fila de Motoboys (FIFO): * O motoboy entra no final da fila ao fazer "Check-in" no App (chegada na lanchonete).

O sistema prioriza o motoboy que está há mais tempo esperando na base.

Tracking: O motoboy atualiza o status no App e o sistema libera a próxima entrega da fila.

3.4. Financeiro e Fiscal
Fluxo de Caixa: Registro de todas as entradas (Vendas) e saídas (Compras/Insumos/Pagamento Motoboy).

NFC-e (Fase 2): Integração com SEFAZ para emissão de cupom fiscal dos pedidos integrados.

Contador: Exportação mensal de relatórios em CSV/Excel.

Perfil,Acesso
Admin,"Gestão Financeira, Compras, Relatórios e Configurações de Sistema."
Atendente,"Gestão de Pedidos, Montagem de Rotas e Despacho."
Motoboy,"App Mobile: Visualizar rotas, GPS e gerenciar sua posição na fila."

5. Próximos Passos (Workflow Cursor)
DB Schema: Criar o arquivo schema.prisma com as tabelas de Insumos, Produtos, Ficha Tecnica, Pedidos e Fila de Motoboys.

API Core: Implementar o errorHandler e a base da Clean Architecture.

Integradores: Criar os serviços de consumo das APIs do iFood e Anota.AI.

Logística: Implementar a lógica de ordenação da fila de motoboys.