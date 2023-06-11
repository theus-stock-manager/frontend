import { ICompany } from "./company";

export interface IUser {
  id: string;
  name: string;
  isAdm: boolean;
  isStaff: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  company: ICompany;
}

export interface IUserCreateRequest {
  name: string;
  password: string;
  confirmPassword?: string;
  securityAsk: string;
  securityAnswer: string;
}
