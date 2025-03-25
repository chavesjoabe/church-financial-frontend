import { Dayjs } from "dayjs";
import { Balance } from "../../models/balance.models";

export type CreateBalancePayload = {
  type: string,
  value: number,
  responsible: string,
  balanceDate: Date,
  description: string,
  freeDescription?: string,
  incomingType?: string | null,
}

export class BalanceService {
  private static BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/balance`;

  public static async createBalance(payload: CreateBalancePayload, token: string) {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const response = rawResponse.json();
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON CREATE BALANCE - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async getAllPendingBalances(token: string): Promise<Balance[] | null> {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      if (!rawResponse.ok) {
        return null;
      }

      const response = await rawResponse.json();
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON GET PENDING BALANCES - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async approveBalance(balanceId: string, token: string): Promise<Balance> {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/approve/${balanceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      const response = await rawResponse.json();
      return response;

    } catch (error) {
      const errorMessage = `ERROR ON APPROVE BALANCE - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async rejectBalance(balanceId: string, token: string): Promise<Balance> {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/reject/${balanceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      const response = await rawResponse.json();
      return response;

    } catch (error) {
      const errorMessage = `ERROR ON REJECT BALANCE - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async extractReport(startDate: Dayjs, endDate: Dayjs, type: string, token: string) {
    try {
      if (type === 'outgoing_chart') {
        type = 'outgoing';
      }

      const rawResponse = await fetch(`${this.BASE_URL}/report/${type}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      });

      const response = await rawResponse.json();
      return response;

    } catch (error) {
      const errorMessage = `ERROR ON EXTRACT REPORT - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

} 
