import { ICompany } from "@/globalTypes/company";

export interface ICompanyRowCardProps {
  company: ICompany;
  toggleEditModal: () => void;
}
