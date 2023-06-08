import { ICompany } from "@/globalTypes/company";

export interface IEditCompanyFormProps {
  selectedCompany: ICompany | null;
  toggleModal: () => void;
  getAllCompanies: () => Promise<void>;
}
