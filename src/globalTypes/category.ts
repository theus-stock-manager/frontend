import { ICompany } from "./company";

export interface ICategory {
  id: string;
  name: string;
  company: ICompany;
}

export interface ICategoryCreateRequest {
  name: string;
}
