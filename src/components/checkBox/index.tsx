import { FaCheck } from "react-icons/fa";
import * as T from "./types";

export default function CheckBox({ state, toggle, label }: T.ICheckBoxProps) {
  return (
    <section
      className="flex items-center justify-center w-full h-10 gap-2 overflow-hidden cursor-pointer"
      onClick={toggle}
    >
      <div className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-md">
        {state && <FaCheck />}
      </div>

      <span className="font-bold">{label}</span>
    </section>
  );
}
