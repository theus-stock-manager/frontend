import * as B from "@/blocks";
import * as C from "@/components";
import { IUser } from "@/globalTypes/user";
import { useState } from "react";
("use client");

export default function StaffUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const filterUsers = async () => {};

  const filterChange = (value: string) => {
    setFilterValue(value);

    if (value === "") {
      //lógica para exibir todos os usuários
    }
  };

  return (
    <section className="flex flex-col items-center justify-start w-3/4 h-full gap-4 max-md:w-full">
      <h1 className="mb-4 text-4xl font-bold">Empresas</h1>

      <B.Filter
        placeholder="Procurar empresas"
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
