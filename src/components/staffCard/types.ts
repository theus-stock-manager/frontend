import { IconType } from "react-icons";

export interface IStaffCardProps {
  icon: IconType;
  label: string;
  onAction?: () => void;
}
