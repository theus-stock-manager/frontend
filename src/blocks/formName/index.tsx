"use client";

import * as C from "@/components";
import { FormEvent, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function FormName() {
  const [inputValue, setInputValue] = useState("");
  const [isOpenModal] = useState(false);

  const getSecureAsk = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={getSecureAsk}>
      <C.Input
        label=""
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div>
        <C.Button type="submit">
          <IoIosArrowForward className="text-4xl" />
        </C.Button>
      </div>
    </form>
  );
}
