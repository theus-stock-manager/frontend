import {
  IChangePasswordRequest,
  IUserLoginRequest,
} from "@/globalTypes/session";
import {
  IUser,
  IUserCreateRequest,
  IUserUpdateRequest,
} from "@/globalTypes/user";
import { ReactNode } from "react";

export interface IUserContext {
  user: IUser | undefined;
  userLogin: (data: IUserLoginRequest) => Promise<void>;
  createUser: (data: IUserCreateRequest) => Promise<void>;
  protectStaffRoute: () => Promise<void>;
  updateUser: (data: IUserUpdateRequest | {}, userId: string) => Promise<void>;
  deleteUser: (userId: string, toggleModal: () => void) => Promise<void>;
  changePassword: (
    data: IChangePasswordRequest,
    userName: string
  ) => Promise<void>;
  logout: () => void;
}

export interface IUserProviderProps {
  children: ReactNode;
}
