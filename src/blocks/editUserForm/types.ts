import { IUser } from "@/globalTypes/user";

export interface IUpdateUserFormProps {
  toggleModal: () => void;
  getAllUsers: () => Promise<void>;
  selectedUser: IUser;
}
