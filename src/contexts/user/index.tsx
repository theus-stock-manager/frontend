"use client";

import { createContext, useContext, useState } from "react";
import { IUser, IUserCreateRequest } from "@/globalTypes/user";
import { IUserLoginRequest } from "@/globalTypes/session";
import * as T from "./types";
import { toast } from "react-toast";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { AxiosError } from "axios";

const userContext = createContext<T.IUserContext>({} as T.IUserContext);

export const useUserContext = () => {
  const context = useContext(userContext);

  return context;
};

export default function UserProvider({ children }: T.IUserProviderProps) {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const router = useRouter();

  const protectStaffRoute = async () => {
    try {
      const token = localStorage.getItem("@SM-TOKEN");
      const userId = localStorage.getItem("@SM-USER-ID");

      if (!token || !userId) {
        toast.error("Faça login para continuar");
        router.push("/login");
        return;
      }

      const { data } = await api.get<IUser>(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.isStaff) {
        throw new Error();
      }
    } catch (error) {
      toast.error("Entre com uma conta staff para acessar essa rota");

      router.push("/login");
    }
  };

  const userLogin = async (data: IUserLoginRequest) => {
    try {
      const response = await api.post("/session/login", data);

      localStorage.setItem("@SM-TOKEN", response.data.token);
      localStorage.setItem("@SM-USER-ID", response.data.user.id);

      setUser(response.data.user);
      toast.success("Sucesso!");

      router.push("/staff-panel");
    } catch (error) {
      console.log(error);

      toast.error("Algo deu errado");
      // router.push("/erro");
    }
  };

  const createUser = async (data: IUserCreateRequest) => {
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      await api.post("/users", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error("Usuário já existe no banco de dados");
      } else {
        toast.error("Erro ao tentar criar um usuário");
      }
    }
  };

  return (
    <userContext.Provider
      value={{ userLogin, user, protectStaffRoute, createUser }}
    >
      {children}
    </userContext.Provider>
  );
}
