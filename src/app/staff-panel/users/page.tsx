"use client";

import * as B from "@/blocks";
import * as C from "@/components";
import { IUser } from "@/globalTypes/user";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toast";

export default function StaffUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const token = localStorage.getItem("@SM-TOKEN");

  const getUsers = async (page?: number, limit?: number) => {
    try {
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page || 1, limit: limit || 5 },
      });

      setUsers(response.data.results);
      setCount(response.data.count);
      setCurrentPage(response.data.page);
      setNumOfPages(Math.ceil(response.data.count / response.data.limit));
    } catch (error) {
      toast.error("Problemas ao carregar os usuários");
    }
  };

  const filterUsers = async (page?: number, limit?: number) => {
    try {
      setIsFilter(true);

      //lógica de filtragem

      setCurrentPage(1);
      setNumOfPages(1);
    } catch (error) {
      toast.error("Erro ao filtrar os usuários");
      setIsFilter(false);
    }
  };

  const filterChange = (value: string) => {
    setFilterValue(value);

    if (value === "") {
      getUsers();
    }
  };

  // useEffect(() => {}, [])

  return (
    <section className="flex flex-col items-center justify-start w-3/4 h-full gap-4 max-md:w-full">
      <h1 className="mb-4 text-4xl font-bold">Usuários</h1>

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

      <div>
        <h3>
          Total: <span>{`${count} usuário${count > 1 && "s"}`}</span>
        </h3>
      </div>

      {/* Cards de usuários */}
      {users.map((user) => (
        <h2>{user.name}</h2>
      ))}

      {!isFilter && (
        <div className="w-full">
          <B.PaginationBlock
            actionPage={getUsers}
            currentPage={currentPage}
            numOfPages={numOfPages}
          />
        </div>
      )}
    </section>
  );
}
