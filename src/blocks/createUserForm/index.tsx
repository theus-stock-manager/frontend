import * as C from "@/components";
import * as T from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserCreateRequest, IUserCreateRequestForm } from "@/globalTypes/user";
import { userCreateSchema } from "@/schemas/user";
import { useEffect, useState } from "react";
import { ICompany } from "@/globalTypes/company";
import api from "@/services/api";
import { toast } from "react-toast";
import { FaUser, FaQuestion, FaQuoteLeft, FaLock } from "react-icons/fa";
import { useUserContext } from "@/contexts/user";

export default function CreateUserForm({
  getAllUsers,
  toggleModal,
}: T.ICreatUserFormProps) {
  const [isAdm, setIsAdm] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [activeOpt, setActiveOpt] = useState<string>("");

  const { createUser } = useUserContext();

  const toggleIsAdm = () => setIsAdm(!isAdm);

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
  } = useForm<IUserCreateRequestForm>({
    resolver: zodResolver(userCreateSchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateUser = async (data: IUserCreateRequestForm) => {
    delete data.confirmPassword;

    const selectedCompany = companies.find(
      (company) => company.name === activeOpt
    );

    const userRequest: IUserCreateRequest = {
      companyId: selectedCompany!.id,
      isAdm,
      ...data,
    };

    await createUser(userRequest);
    await getAllUsers();

    toggleModal();
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <section className="flex flex-col items-center justify-start w-full gap-4 overflow-y-auto max-h-[70vh]">
      <h3 className="text-xl font-bold">Criar Empresa</h3>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col items-center justify-center w-[98%] gap-4 mb-2"
      >
        <C.Input
          label="Nome"
          icon={FaUser}
          placeholder="Nome do usuário"
          error={errors.name?.message}
          {...register("name")}
        />

        <C.Input
          label="Pergunta"
          icon={FaQuestion}
          placeholder="Pergunta de segurança"
          error={errors.securityAsk?.message}
          {...register("securityAsk")}
        />

        <C.Input
          label="Resposta"
          icon={FaQuoteLeft}
          placeholder="Resposta de segurança"
          error={errors.securityAnswer?.message}
          {...register("securityAnswer")}
        />

        <C.Select
          label="Empresa"
          activeOpt={activeOpt}
          options={options}
          setAction={setActiveOpt}
        />

        <C.CheckBox state={isAdm} toggle={toggleIsAdm} label="Administrador" />

        <C.Input
          label="Senha"
          icon={FaLock}
          placeholder="Senha"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <C.Input
          label="Confirme"
          icon={FaLock}
          placeholder="Confirme a senha"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <C.Button type="submit">Criar</C.Button>
      </form>
    </section>
  );
}
