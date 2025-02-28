import { Tax } from "../../models/tax.models";

export class TaxService {
  private static BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tax`;

  public static async getTaxes(token: string): Promise<Tax> {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/all`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      });

      const response = rawResponse.json();
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON GET TAXES - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async updateTaxes(requestBody: Tax, token: string): Promise<Tax> {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(requestBody)
      });

      const response = rawResponse.json();
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON GET TAXES - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
