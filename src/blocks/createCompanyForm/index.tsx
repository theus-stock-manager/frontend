"use client";

import * as T from "./types";
import * as C from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema } from "@/schemas/company";
import { ICompanyCreateRequest } from "@/globalTypes/company";
import { useCompanyContext } from "@/contexts/company";
import { FaRegImage, FaBuilding } from "react-icons/fa";

export default function CreateCompanyForm({
  toggleModal,
  getAllCompanies,
}: T.ICreatCompanyFormProps) {
  const { createCompany } = useCompanyContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICompanyCreateRequest>({
    resolver: zodResolver(createCompanySchema),
    reValidateMode: "onSubmit",
  });

  const handleCreateCompany = async (data: ICompanyCreateRequest) => {
    await createCompany(data, toggleModal);
    await getAllCompanies();
  };

  return (
    <section className="flex flex-col items-center justify-center w-full gap-4">
      <h3 className="text-xl font-bold">Criar Empresa</h3>
      <form
        onSubmit={handleSubmit(handleCreateCompany)}
        className="flex flex-col items-center justify-center w-full gap-2 mb-2"
      >
        <C.Input
          label="Nome"
          icon={FaBuilding}
          placeholder="Nome da empresa"
          error={errors.name?.message}
          {...register("name")}
        />
        <C.Input
          label="Logo"
          icon={FaRegImage}
          placeholder="Link da logo"
          error={errors.image?.message}
          {...register("image")}
        />
        <C.Button type="submit">Criar</C.Button>
      </form>
    </section>
  );
}
