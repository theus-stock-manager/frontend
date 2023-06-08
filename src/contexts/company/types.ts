import { ICategory } from "@/globalTypes/category";
import {
  ICompany,
  ICompanyCreateRequest,
  ICompanyUpdateRequest,
} from "@/globalTypes/company";
import { IProduct } from "@/globalTypes/product";
import { ISale } from "@/globalTypes/sale";
import { IUser } from "@/globalTypes/user";
import { ReactNode } from "react";

export interface ICompanyContext {
  company: ICompany;
  // companyCategories: ICategory[];
  // companyProducts: IProduct[];
  // companySales: ISale[];
  // companyUsers: IUser[];
  createCompany: (
    data: ICompanyCreateRequest,
    toggle: () => void
  ) => Promise<void>;

  updateCompany: (
    data: ICompanyUpdateRequest,
    toggle: () => void,
    companyId: string
  ) => Promise<void>;

  deleteCompany: (toggle: () => void, companyId: string) => Promise<void>;
}

export interface ICompanyProviderProps {
  children: ReactNode;
}
