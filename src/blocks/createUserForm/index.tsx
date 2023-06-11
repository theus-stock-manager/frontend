import * as C from "@/components";
import * as T from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserCreateRequest } from "@/globalTypes/user";
import { userCreateSchema } from "@/schemas/user";
import { useEffect, useState } from "react";
import { ICompany } from "@/globalTypes/company";
import api from "@/services/api";
import { toast } from "react-toast";
import { FaUser, FaQuestion, FaQuoteLeft, FaLock } from "react-icons/fa";

export default function CreateUserForm({
  getAllUsers,
  toggleModal,
}: T.ICreatUserFormProps) {
  const [isAdm, setIsAdm] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [activeOpt, setActiveOpt] = useState<string>("");

  const getAllCompanies = async () => {
    const token = localStorage.getItem("@SM-TOKEN");

    try {
      const response = await api.get("/companies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompanies(response.data.results);

      const companiesNames: string[] = response.data.results.map(
        (company: ICompany) => company.name
      );

      setOptions(companiesNames);
      setActiveOpt(companiesNames[0]);
    } catch (error) {
      toast.error("erro ao buscar todas as empresas");
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserCreateRequest>({
    resolver: zodResolver(userCreateSchema),
  });

  const handleCreateUser = (data: IUserCreateRequest) => {
    console.log(data);
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <section className="flex flex-col items-center justify-start w-full gap-4 overflow-x-hidden overflow-y-auto max-h-[70vh]">
      <h3 className="text-xl font-bold">Criar Empresa</h3>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col items-center justify-center w-full gap-2 mb-2"
      >
        <C.Input
          label="Nome"
          icon={FaUser}
          placeholder="Nome do usuário"
          // error={errors.name?.message}
          {...register("name")}
        />
        <C.Input
          label="Pergunta"
          icon={FaQuestion}
          placeholder="Pergunta de segurança"
          // error={errors.image?.message}
          // {...register("image")}
        />
        <C.Input
          label="Resposta"
          icon={FaQuoteLeft}
          placeholder="Resposta de segurança"
          // error={errors.image?.message}
          // {...register("image")}
        />
        <C.Select
          label="Empresa"
          activeOpt={activeOpt}
          options={options}
          setAction={setActiveOpt}
        />
        <C.Input
          label="Senha"
          icon={FaLock}
          placeholder="Senha"
          type="password"
          // error={errors.image?.message}
          // {...register("image")}
        />
        <C.Input
          label="Confirme"
          icon={FaLock}
          placeholder="Confirme a senha"
          type="password"
          // error={errors.image?.message}
          // {...register("image")}
        />
        <C.Button type="submit">Criar</C.Button>
      </form>
    </section>
  );
}
