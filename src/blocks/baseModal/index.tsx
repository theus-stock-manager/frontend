import * as T from "./types";
import { FaWindowClose } from "react-icons/fa";

export default function BaseModal({
  children,
  toggleModal,
}: T.IBaseModalProps) {
  return (
    <section className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
      <div
        className="absolute w-full h-full bg-[#27272Acc]"
        onClick={toggleModal}
      ></div>
      <section className="relative flex flex-col items-center justify-center w-64 p-4 rounded-lg bg-zinc-900">
        <FaWindowClose
          className="absolute text-3xl cursor-pointer -right-4 -top-4"
          onClick={toggleModal}
        />
        {children}
      </section>
    </section>
  );
}
