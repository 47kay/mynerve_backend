export interface IAuthUser {
  permissions: string[];
  id: number;
  username: string;
  email?: string;
  clientId: string;
}

declare module "express" {
  interface Request {
    user: IAuthUser;
    files?: any;
  }
}
