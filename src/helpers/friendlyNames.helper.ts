import { BalanceIncomingType } from "../models/balance.models";

export const balanceTypeMapper: Record<string, string> = {
  INCOMING: 'Entrada',
  OUTGOING: 'Saída',
};

export const balanceStatusMapper: Record<string, string> = {
  PENDING: 'Pendente',
};

export const balanceDescriptionMapper: Record<string, string> = {
  MONEY: 'Dinheiro',
  CARD: 'Cartão',
  PIX: 'Pix',
  FOOD: 'Alimentação',
  CHILDREN_DEPT_FOOD: 'Alimentação departamento infantíl',
  TRADE: 'Troco',
  PAYMENT: 'Pagamento',
  MISSIONARY_OFFERING: 'Oferta missionária',
  EMPLOYEE_PAYMENT: 'Pagamento funcionário',
  OTHER: 'Outros',
};

export const incomingTypeMapper: Record<BalanceIncomingType, string> = {
  OFICIAL: 'Oficial',
  NON_OFICIAL: 'Não Oficial',
  TRANSFER: "Repasse - Aliança",
  TRANSFER_GEOL: "Repasse - GEOL",
};

export const reportTypesMapper: Record<string, string> = {
  incoming: 'Entradas',
  outgoing: 'Saídas',
  incoming_outgoing: 'Entradas e Saídas',
  accounting: 'Contábil',
  outgoing_chart: 'Gráfico de Saídas',
};

export const getFriendlyName = (name: string, nameMapper: Record<string, string>) => {
  return nameMapper[name];
};
