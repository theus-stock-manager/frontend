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
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const toggleCreateModal = () => setIsOpenCreate(!isOpenCreate);

  const toggleEditModal = () => setIsOpenCreate(!isOpenCreate);

  const getAllUsers = async (page?: number, limit?: number) => {
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page, limit: limit },
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
    const token = localStorage.getItem("@SM-TOKEN");
    try {
      setIsFilter(true);

      const response = await api.get("/users/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params: { partialName: filterValue },
      });

      setUsers(response.data.results);
      setCount(response.data.count);

      setCurrentPage(1);
      setNumOfPages(1);
    } catch (error) {
      toast.error("Erro ao filtrar os usuários");
      setIsFilter(false);
      getAllUsers();
    }
  };

  const filterChange = (value: string) => {
    setFilterValue(value);

    if (value === "") {
      setIsFilter(false);
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {isOpenCreate && (
        <B.BaseModal toggleModal={toggleCreateModal}>
          <B.CreateUserForm
            getAllUsers={getAllUsers}
            toggleModal={toggleCreateModal}
          />
        </B.BaseModal>
      )}

      <section className="flex flex-col items-center justify-start w-3/4 h-full gap-4 max-md:w-full">
        <h1 className="mb-4 text-4xl font-bold">Usuários</h1>

        <B.Filter
          placeholder="Procurar usuários"
          filterValue={filterValue}
          onFilterChange={filterChange}
          onFilterAction={filterUsers}
        />

        <div className="w-full h-16">
          <C.Button secondary onClick={toggleCreateModal}>
            Criar usuário
          </C.Button>
        </div>

        {/* Cards de usuários */}
        {users.map((user) => (
          <C.UserRowCard
            key={user.id}
            user={user}
            toggleEditModal={toggleEditModal}
          />
        ))}

        <div>
          <h3 className="text-primary">
            Total: <span>{`${count} usuário${count !== 1 ? "s" : ""}`}</span>
          </h3>
        </div>

        {!isFilter && (
          <div className="w-full">
            <B.PaginationBlock
              actionPage={getAllUsers}
              currentPage={currentPage}
              numOfPages={numOfPages}
            />
          </div>
        )}
      </section>
    </>
  );
}
