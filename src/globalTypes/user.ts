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
  isAdm: boolean;
  securityAsk: string;
  securityAnswer: string;
  companyId: string;
}
