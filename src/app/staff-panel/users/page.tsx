"use client";

import * as B from "@/blocks";
import * as C from "@/components";
import { IUser } from "@/globalTypes/user";
import api from "@/services/api";
import { useState } from "react";
import { toast } from "react-toast";

export default function StaffUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const token = localStorage.getItem("@SM-TOKEN");

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, limit: 5 },
      });

      setUsers(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCount(response.data.count);
      setPage(response.data.page);
    } catch (error) {
      toast.error("Problemas ao carregar os usuários");
    }
  };

  const prevUsers = async () => {
    try {
      if (!prevUrl) {
        throw new Error();
      }
      const response = await api.get(prevUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCount(response.data.count);
      setPage(response.data.page);
    } catch (error) {
      toast.error("Problemas ao carregar a página posterior");
      await getUsers();
    }
  };

  const nextUsers = async () => {
    try {
      if (!nextUrl) {
        throw new Error();
      }
      const response = await api.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCount(response.data.count);
      setPage(response.data.page);
    } catch (error) {
      toast.error("Problemas ao carregar a página posterior");
      await getUsers();
    }
  };

  const filterUsers = async () => {
    try {
    } catch (error) {
      toast.error("Erro ao filtrar os usuários");
    }
  };

  const filterChange = (value: string) => {
    setFilterValue(value);

    if (value === "") {
      getUsers();
    }
  };

  return (
    <section className="flex flex-col items-center justify-start w-3/4 h-full gap-4 max-md:w-full">
      <h1 className="mb-4 text-4xl font-bold">Empresas</h1>

      <B.Filter
        placeholder="Procurar usuários"
        filterValue={filterValue}
        onFilterChange={filterChange}
        onFilterAction={filterUsers}
      />

      <div className="w-full h-16">
        <C.Button secondary onClick={() => setIsOpenCreate(true)}>
          Criar usuário
        </C.Button>
      </div>
    </section>
  );
}
