import { AccountingReportItem, TotalObject } from "./balance.models";

export type ReportTypeObject = {
  type: string;
  balances: AccountingReportItem[],
  total: TotalObject,
};
