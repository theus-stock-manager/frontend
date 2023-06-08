import { Dispatch, SetStateAction } from "react";

export interface ISelectProps {
  label?: string;
  setAction: Dispatch<SetStateAction<string>>;
  activeOpt: string;
  options: string[];

  primary?: boolean;
  secondary?: boolean;
}
