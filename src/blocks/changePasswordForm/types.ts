import { IChangePasswordRequest } from "@/globalTypes/session";

export interface IChangePasswordFormProps {
  handleChangePassword: (data: IChangePasswordRequest) => Promise<void>;
}
