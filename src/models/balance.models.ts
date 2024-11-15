export type Balance = {
  id: string;
  type: string;
  value: number;
  responsible: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  balanceDate: string;
  description: string;
  incomingType: string;
}

export const BalanceTypes = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
}

export enum BalanceDescriptionsEnum {
 MONEY = 'MONEY',
 CARD = 'CARD',
 PIX = 'PIX',
 TRADE = 'TRADE',
 FOOD = 'FOOD',
 PAYMENT = 'PAYMENT',
 OTHER = 'OTHER',
}

export const BalanceDescriptions: Record<string, string[]> = {
  incoming: [
    'MONEY',
    'CARD',
    'PIX',
    'OTHER',
  ],
  outgoing: [
    'TRADE',
    'FOOD',
    'PAYMENT',
    'OTHER',
  ],
}

export const BalanceIncomingTypes = {
  OFICIAL: 'OFICIAL',
  NON_OFICIAL: 'NON_OFICIAL'
}

export type AccountingReportItem = {
  balanceId: string;
  type: string;
  value: number;
  responsible: string;
  status: string;
  balanceDate: string;
  description: string;
  incomingType: string;
  churchLeaderPercentage: number;
  mainChurchPercentage: number;
  ministryPercentage: number;
  mainLeaderPercentage: number;
}