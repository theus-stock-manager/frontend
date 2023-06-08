"use client";

import * as T from "./types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Select({
  label,
  activeOpt,
  options,
  setAction,
  primary = true,
  secondary = false,
}: T.ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  secondary && (primary = false);
  return (
    /* container */
    <section className="flex flex-col items-start justify-center w-full gap-1">
      {label && (
        <span
          className={`pl-4 text-[11pt] font-bold ${
            primary
              ? "text-select-color-primary"
              : "text-select-color-secondary"
          }`}
        >
          {label}
        </span>
      )}
      {/* dropdown */}
      <div className="w-full h-[2.5rem] flex flex-col justify-start items-center relative">
        {/* toggle */}
        <div
          onClick={toggleIsOpen}
          className={`w-full h-full flex justify-between items-center absolute py-0 px-4 rounded-[.5rem] border-[1px] text-[10pt] font-bold cursor-pointer ${
            primary
              ? "border-select-border-color-primary text-select-color-primary"
              : "border-select-border-color-secondary text-select-color-secondary"
          }`}
        >
          {activeOpt}
          {isOpen ? (
            <IoIosArrowUp className="text-[14pt]" />
          ) : (
            <IoIosArrowDown className="text-[14pt]" />
          )}
        </div>
      </div>

      {isOpen && (
        /* menu */
        <div
          className={`w-full flex flex-col justify-start items-start gap-1 absolute top-[4.5rem] p-6 z-[9999] rounded-[.5rem] border ${
            primary
              ? "bg-select-background-menu-color-primary border-select-border-color-primary"
              : "bg-select-background-menu-color-secondary border-select-border-color-secondary"
          }`}
        >
          {options.map((option) => (
            <span
              key={uuid()}
              onClick={() => {
                setAction(option);
                setIsOpen(false);
              }}
              className={`w-full p-2 rounded cursor-pointer transition-all hover:scale-110 ${
                primary
                  ? "text-select-color-primary hover:transition-all hover:bg-select-hover-background-color-primary"
                  : "text-select-color-secondary hover:transition-all hover:bg-select-hover-background-color-secondary"
              }`}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
