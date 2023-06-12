import * as C from "@/components";
import * as T from "./types";
import * as B from "@/blocks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserUpdateRequest, IUserUpdateRequestForm } from "@/globalTypes/user";
import { useState } from "react";
import {
  FaUser,
  FaQuestion,
  FaQuoteLeft,
  FaLock,
  FaTrash,
} from "react-icons/fa";
import { userUpdateSchema } from "@/schemas/user";
import { useUserContext } from "@/contexts/user";

export default function EditUserForm({
  getAllUsers,
  toggleModal,
  selectedUser,
}: T.IUpdateUserFormProps) {
  const [isAdm, setIsAdm] = useState(selectedUser.isAdm);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleIsDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);

  const toggleIsAdm = () => setIsAdm(!isAdm);

  const { deleteUser, updateUser } = useUserContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserUpdateRequestForm>({
    resolver: zodResolver(userUpdateSchema),
    reValidateMode: "onSubmit",
  });

  const handleUpdateUser = async (data: IUserUpdateRequestForm) => {
    delete data.confirmPassword;
    !data.name && delete data.name;
    !data.password && delete data.password;
    !data.securityAnswer && delete data.securityAnswer;
    !data.securityAsk && delete data.securityAsk;

    const userUpdate: IUserUpdateRequest = {
      ...data,
    };

    isAdm !== selectedUser.isAdm && (userUpdate.isAdm = isAdm);

    await updateUser(userUpdate, selectedUser.id);
    await getAllUsers();
    toggleModal();
  };

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser.id, toggleIsDeleteOpen);
    await getAllUsers();
    toggleModal();
  };

  const ModalDelete = () => (
    <B.BaseModal toggleModal={toggleIsDeleteOpen}>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center">
          Você está prestes a deletar o usuário {selectedUser?.name}, Continuar?
        </p>
        <div className="flex w-full gap-1">
          <C.Button onClick={toggleIsDeleteOpen}>Cancelar</C.Button>
          <div
            onClick={handleDeleteUser}
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
      <section className="flex flex-col items-center justify-start w-full gap-4 overflow-y-auto max-h-[70vh]">
        <h3 className="text-xl font-bold">Criar Usuário</h3>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="flex flex-col items-center justify-center w-[98%] gap-4 mb-2"
        >
          <C.Input
            label="Nome"
            icon={FaUser}
            placeholder={selectedUser.name}
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

          <C.CheckBox
            state={isAdm}
            toggle={toggleIsAdm}
            label="Administrador"
          />

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

          <div className="flex w-full gap-1">
            <C.Button type="submit">Editar</C.Button>
            <div
              className="w-[25%] bg-red-500 rounded-lg flex justify-center items-center cursor-pointer"
              onClick={toggleIsDeleteOpen}
            >
              <FaTrash />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
