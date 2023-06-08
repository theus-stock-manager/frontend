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
  // const [companyCategories, setCompanyCategories] = useState<ICategory[]>([]);
  // const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
  // const [companySales, setCompanySales] = useState<ISale[]>([]);
  // const [companyUsers, setCompanyUsers] = useState<IUser[]>([]);

  const token = localStorage.getItem("@SM-TOKEN");

  const { user } = useUserContext();

  const createCompany = async (
    data: ICompanyCreateRequest,
    toggle: () => void
  ) => {
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

  // const getCompanyCategories = async (companyId: string) => {
  //   try {
  //     api
  //       .get(`/companies/${companyId}/categories`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setCompanyCategories(res.data.results);
  //       });
  //   } catch (error) {
  //     toast.error("Categorias: algo deu errado.");
  //   }
  // };

  // const getCompanyProducts = async (companyId: string, url?: string) => {
  //   try {
  //     api
  //       .get(url || `/companies/${companyId}/products`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setCompanyProducts(res.data.results);
  //       });
  //   } catch (error) {
  //     toast.error("Produtos: algo deu errado.");
  //   }
  // };

  // const getCompanySales = async (companyId: string, url?: string) => {
  //   try {
  //     api
  //       .get(url || `/companies/${companyId}/sales`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setCompanySales(res.data.results);
  //       });
  //   } catch (error) {
  //     toast.error("Vendas: algo deu errado.");
  //   }
  // };

  // const getCompanyUsers = async (companyId: string) => {
  //   try {
  //     api
  //       .get(`/companies/${companyId}/users`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setCompanyUsers(res.data.results);
  //       });
  //   } catch (error) {
  //     toast.error("Usuários: algo deu errado.");
  //   }
  // };

  // const getCompanyInfo = async (companyId: string) => {
  //   user?.isStaff && getCompanyUsers(companyId);

  //   user?.isAdm && getCompanySales(companyId);

  //   getCompanyCategories(companyId);
  //   getCompanyProducts(companyId);
  // };

  useEffect(() => {
    if (!!user) {
      setCompany(user.company);
      // getCompanyInfo(user.company.id);
    }
  }, [user]);

  // console.log("Empresa => ", company);
  // console.log("Categorias => ", companyCategories);
  // console.log("Produtos => ", companyProducts);
  // console.log("Vendas => ", companySales);
  // console.log("Usuários => ", companyUsers);

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
