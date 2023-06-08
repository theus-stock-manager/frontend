import { ICategory } from "./category";
import { ICompany } from "./company";

export interface IProduct {
  id: string;
  name: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  createdAt: Date;
  updatedAt: Date;
  category: ICategory | null;
  company: ICompany;
}

export interface IProductCreateRequest {
  categoryName: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}
