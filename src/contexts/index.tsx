"use client";
import { ReactNode } from "react";
import UserProvider from "./user";
import CompanyProvider from "./company";
import { ToastContainer } from "react-toast";

interface IContextsProps {
  children: ReactNode;
}

export default function Contexts({ children }: IContextsProps) {
  return (
    <>
      <UserProvider>
        <CompanyProvider>{children}</CompanyProvider>
      </UserProvider>
      <ToastContainer delay={3000} />
    </>
  );
}
