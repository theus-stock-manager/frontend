"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  ICompany,
  ICompanyCreateRequest,
  ICompanyUpdateRequest,
} from "@/globalTypes/company";
import { ICategory } from "@/globalTypes/category";
import { IUser } from "@/globalTypes/user";
import { ISale } from "@/globalTypes/sale";
import { IProduct } from "@/globalTypes/product";
import * as T from "./types";
import { useUserContext } from "../user";
import api from "@/services/api";
import { toast } from "react-toast";

const companyContext = createContext<T.ICompanyContext>(
  {} as T.ICompanyContext
);

export const useCompanyContext = () => {
  const context = useContext(companyContext);

  return context;
};

export default function CompanyProvider({ children }: T.ICompanyProviderProps) {
  const [company, setCompany] = useState<ICompany>({} as ICompany);

  const { user } = useUserContext();

  const createCompany = async (
    data: ICompanyCreateRequest,
    toggle: () => void
  ) => {
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      await api.post("/companies", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Empresa criada com sucesso!");
      toggle();
    } catch (error) {
      toast.error("Erro na criação desta empresa");
    }
  };

  const updateCompany = async (
    data: ICompanyUpdateRequest,
    toggle: () => void,
    companyId: string
  ) => {
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      await api.patch(`/companies/${companyId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Empresa atualizada com sucesso!");
      toggle();
    } catch (error) {
      toast.error("Erro na edição desta empresa");
    }
  };

  const deleteCompany = async (toggle: () => void, companyId: string) => {
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      await api.delete(`/companies/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Empresa deletada com sucesso!");
      toggle();
    } catch (error) {
      toast.error("Erro ao deletar esta empresa");
    }
  };

  useEffect(() => {
    if (!!user) {
      setCompany(user.company);
    }
  }, [user]);

  return (
    <companyContext.Provider
      value={{
        company,
        // companyCategories,
        // companyProducts,
        // companySales,
        // companyUsers,
        createCompany,
        updateCompany,
        deleteCompany,
      }}
    >
      {children}
    </companyContext.Provider>
  );
}
