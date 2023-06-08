import { ICompany } from "./company";
import { IUser } from "./user";

interface ISaleProduct {
  quantity: number;
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISale {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  user: IUser;
  products: ISaleProduct[];
  company: ICompany;
}
