import axios, { HttpStatusCode } from 'axios';

export type CreateUserPayload = {
  name: string;
  email: string;
  document: string;
  role?: string;
  password: string;
}

export type LoginResponse = {
  token: string;
}

export class UserService {
  private static BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/user`;

  public static async getResponsibles(): Promise<string[]> {
    const { data: response } = await axios.get('/responsibles.json');
    return response;
  }

  public static async createUser(createUserPayload: CreateUserPayload, token: string) {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(createUserPayload),
      });

      const response = rawResponse.json();
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON CREATE USER - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async login(document: string, password: string): Promise<string | null> {
    try {
      const loginPayload = {
        document,
        password,
      };

      const rawResponse = await fetch(`${this.BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if(rawResponse.status === HttpStatusCode.Forbidden) {
        console.log('error on login');
        return null;
      }

      const response: LoginResponse = await rawResponse.json();
      return response.token;
    } catch (error) {
      const errorMessage = `ERROR ON LOGIN - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async getUserByDocument(document: string, token: string) {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/document/${document}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      });

      const response = await rawResponse.json()

      return response;
    } catch (error) {
      const errorMessage = `ERROR ON LOGIN - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public static async update(updatePayload: CreateUserPayload, token: string) {
    try {
      const rawResponse = await fetch(`${this.BASE_URL}/update/${updatePayload.document}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(updatePayload)
      });

      const response = await rawResponse.json()

      return response;
    } catch (error) {
      const errorMessage = `ERROR ON LOGIN - ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
