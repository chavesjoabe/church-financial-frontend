export type Balance = {
  id: string;
  type: string;
  value: number;
  responsible: string;
  responsibleName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  balanceDate: string;
  description: string;
  incomingType: string;
  freeDescription: string;
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
    'CHILDREN_DEPT_FOOD',
    'MISSIONARY_OFFERING',
    'EMPLOYEE_PAYMENT',
  ],
}

export const BalanceIncomingTypes = {
  NON_OFICIAL: 'NON_OFICIAL',
  OFICIAL: 'OFICIAL',
  TRANSFER: 'TRANSFER',
  TRANSFER_GEOL: 'TRANSFER_GEOL',
} as const;

export type BalanceIncomingType = typeof BalanceIncomingTypes[keyof typeof BalanceIncomingTypes]

export type AccountingReportItem = {
  balanceId: string;
  type: string;
  value: number;
  responsible: string;
  status: string;
  balanceDate: string;
  description: string;
  freeDescription: string;
  incomingType: string;
  churchFirstLeaderPercentage: number;
  churchSecondLeaderPercentage: number;
  mainChurchPercentage: number;
  ministryPercentage: number;
  mainLeaderPercentage: number;
}

export type TotalObject = {
  churchFirstLeaderPercentage: number;
  churchSecondLeaderPercentage: number;
  mainChurchPercentage: number;
  ministryPercentage: number;
  mainLeaderPercentage: number;
  total: number;
}

export type AccountingReportResponseV2 = {
  balances: AccountingReportItem[];
  balancesTotal: TotalObject;
  transferBalances: AccountingReportItem[];
  transferBalancesTotal: TotalObject;
  transferGeolBalances: AccountingReportItem[];
  transferGeolBalancesTotal: TotalObject;
  nonOficialBalances: Balance[];
}
