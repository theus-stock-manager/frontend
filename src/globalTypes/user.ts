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

export interface IUserCreateRequestForm {
  name: string;
  password: string;
  confirmPassword?: string;
  securityAsk: string;
  securityAnswer: string;
}

export interface IUserUpdateRequestForm {
  name?: string;
  password?: string;
  confirmPassword?: string;
  securityAsk?: string;
  securityAnswer?: string;
}

export interface IUserUpdateRequest {
  name?: string;
  password?: string;
  confirmPassword?: string;
  isAdm?: boolean;
  securityAsk?: string;
  securityAnswer?: string;
}

export interface IUserCreateRequest {
  name: string;
  password: string;
  securityAsk: string;
  securityAnswer: string;
  isAdm: boolean;
  companyId: string;
}
