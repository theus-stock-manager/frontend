import * as T from "./types";
import * as C from "@/components";
import { FaSearch } from "react-icons/fa";

export default function Filter({
  onFilterAction,
  onFilterChange,
  placeholder,
  filterValue,
}: T.IFilterProps) {
  return (
    <div className="w-full flex gap-2 items-center justify-center">
      <C.Input
        label=""
        placeholder={placeholder}
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <div className="w-[20%] flex items-center justify-center">
        <C.Button onClick={() => onFilterAction()}>
          <FaSearch className="justify-self-center" />
        </C.Button>
      </div>
    </div>
  );
}
