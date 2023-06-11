import { IUser } from "@/globalTypes/user";

export interface ICompanyRowCardProps {
  user: IUser;
  toggleEditModal: () => void;
}
