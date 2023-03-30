export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export type ISetResponseData =
  | {
      status?: boolean;
      message?: string | null;
      data?: any | null;
      error?: any | null;
    }
  | any;
