import { ReactNode } from "react";

export interface IBaseModalProps {
  children: ReactNode;
  toggleModal: () => void;
}
