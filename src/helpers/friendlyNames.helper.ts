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
  TRADE: 'Troco',
  PAYMENT: 'Pagamento',
  OTHER: 'Outros',
};

export const incomingTypeMapper: Record<string, string> = {
  OFICIAL: 'Oficial',
  NON_OFICIAL: 'Não Oficial',
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
