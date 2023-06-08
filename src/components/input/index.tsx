"use client";

import { forwardRef, useEffect, useState } from "react";
import * as T from "./types";
import { FiEye, FiEyeOff } from "react-icons/fi";

/* 

Para usar este input e ficar fácil para personalizar eu precisei criar algumas variáveis no tailwind.config.js dentro do module.exports e são elas:

theme: {
    extend: {
      textColor: {
        "input-color-primary": string,
        "input-color-secondary": string,
      },
      placeholderColor: {
        "input-placeholder-color-primary": string,
        "input-placeholder-color-secondary": string",
      },
      borderColor: {
        "input-border-color-primary": string,
        "input-border-color-secondary": string,
      },
      backgroundColor: {
        "input-background-color-primary": string,
        "input-background-color-secondary": string,
      },
    },
  },
*/

const Input = forwardRef<HTMLInputElement, T.IInputProps>(
  (
    {
      label,
      primary = true,
      secondary = false,
      icon: Icon,
      error,
      type,
      ...rest
    },
    ref
  ) => {
    const [isPassword, setIsPassword] = useState(false);
    const [isErrored, setIsErrored] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    secondary && (primary = false);

    const toggleIsPassword = () => setIsPassword(!isPassword);

    const inputClass = `${
      isErrored
        ? "text-red-600"
        : `${
            primary ? "text-input-color-primary" : "text-input-color-secondary"
          }`
    } w-[80%] flex-1 items-center border-none outline-none bg-transparent text-[10pt] ${
      primary
        ? "placeholder-input-placeholder-color-primary"
        : "placeholder-input-placeholder-color-secondary"
    } no-spin`;

    const passwordEyeClass = `text-[14pt] ${
      primary ? "text-input-color-primary" : "text-input-color-secondary"
    } cursor-pointer`;

    useEffect(() => {
      type === "password" ? setIsPassword(true) : setIsPassword(false);
    }, [type]);

    useEffect(() => {
      !!error ? setIsErrored(true) : setIsErrored(false);
    }, [error]);

    return (
      <div className="w-full text-[11pt] text-left ">
        <div
          className={`w-full pl-4 mb-1 overflow-hidden font-bold ${
            primary ? "text-input-color-primary" : "text-input-color-secondary"
          } whitespace-nowrap overflow-ellipsis`}
        >
          {label}{" "}
          {!!error && (
            <span
              title={error}
              className="max-sm:text-[7pt] text-[9pt] text-red-600"
            >
              {" "}
              - {error}
            </span>
          )}
        </div>

        <section
          className={`w-full h-[2.5rem] flex items-center p-[.5rem] transition-all
            ${
              primary
                ? "bg-input-background-color-primary"
                : "bg-input-background-color-secondary"
            }
          border-[1px] ${
            error
              ? "border-red-600"
              : primary
              ? "border-color-input-border-color-primary"
              : "border-color-input-border-color-secondary"
          } rounded-[.5rem] px-3 ${isFocus && "custom-shadow"}`}
        >
          {Icon && (
            <Icon
              className={`${
                isErrored
                  ? "text-red-600"
                  : primary
                  ? "text-input-color-primary"
                  : "text-input-color-secondary"
              } text-[14pt] mr-2`}
            />
          )}

          {type === "password" ? (
            <>
              <input
                type={isPassword ? "password" : "text"}
                {...rest}
                ref={ref}
                className={inputClass}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
              {isPassword ? (
                <FiEye
                  onClick={toggleIsPassword}
                  className={passwordEyeClass}
                />
              ) : (
                <FiEyeOff
                  onClick={toggleIsPassword}
                  className={passwordEyeClass}
                />
              )}
            </>
          ) : (
            <input
              type={type}
              {...rest}
              ref={ref}
              className={inputClass}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          )}
        </section>
      </div>
    );
  }
);

export default Input;
