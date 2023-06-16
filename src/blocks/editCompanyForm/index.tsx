"use client";

import * as T from "./types";
import * as C from "@/components";
import * as B from "@/blocks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCompanySchema } from "@/schemas/company";
import { ICompanyUpdateRequest } from "@/globalTypes/company";
import { useCompanyContext } from "@/contexts/company";
import { FaRegImage, FaBuilding, FaTrash } from "react-icons/fa";
import { toast } from "react-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCompanyForm({
  selectedCompany,
  toggleModal,
  getAllCompanies,
}: T.IEditCompanyFormProps) {
  !selectedCompany && toggleModal();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { updateCompany, deleteCompany } = useCompanyContext();

  const router = useRouter();

  const toggleIsDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICompanyUpdateRequest>({
    resolver: zodResolver(editCompanySchema),
    reValidateMode: "onSubmit",
  });

  const handleUpdateCompany = async (data: ICompanyUpdateRequest) => {
    if (!data.name && !data.image) {
      toast.error("Nada para atualizar!");
    } else {
      !data.name && delete data.name;
      !data.image && delete data.image;

      await updateCompany(data, toggleModal, selectedCompany!.id);
      await getAllCompanies();
    }
  };

  const handleDeleteCompany = async () => {
    await deleteCompany(toggleIsDeleteOpen, selectedCompany!.id);
    await getAllCompanies();
    toggleModal();
  };

  const ModalDelete = () => (
    <B.BaseModal toggleModal={toggleIsDeleteOpen}>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center">
          Você está prestes a deletar a empresa {selectedCompany?.name},
          Continuar?
        </p>
        <div className="flex w-full gap-1">
          <C.Button onClick={toggleIsDeleteOpen}>Cancelar</C.Button>
          <div
            onClick={handleDeleteCompany}
            className="w-[50%] bg-red-500 rounded-lg flex justify-center items-center cursor-pointer"
          >
            Deletar
          </div>
        </div>
      </div>
    </B.BaseModal>
  );

  return (
    <>
      {isDeleteOpen && <ModalDelete />}
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h3 className="text-xl font-bold">Editar Empresa</h3>
        <form
          onSubmit={handleSubmit(handleUpdateCompany)}
          className="flex flex-col items-center justify-center w-full gap-2 mb-2"
        >
          <C.Input
            label="Nome"
            icon={FaBuilding}
            placeholder={selectedCompany?.name}
            error={errors.name?.message}
            {...register("name")}
          />
          <C.Input
            label="Logo"
            icon={FaRegImage}
            placeholder={selectedCompany?.image}
            error={errors.image?.message}
            {...register("image")}
          />
          <div className="flex w-full gap-1">
            <C.Button type="submit">Editar</C.Button>
            <div
              className="w-[25%] bg-red-500 rounded-lg flex justify-center items-center cursor-pointer"
              onClick={toggleIsDeleteOpen}
            >
              <FaTrash />
            </div>
          </div>
          <div className="w-full">
            <C.Button
              secondary
              onClick={() => router.push(`/dashboard/${selectedCompany!.id}`)}
            >
              Visitar a empresa
            </C.Button>
          </div>
        </form>
      </section>
    </>
  );
}
