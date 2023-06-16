"use client";

import * as C from "@/components";
import * as B from "@/blocks";
import api from "@/services/api";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toast";
import { IChangePasswordRequest } from "@/globalTypes/session";
import { useUserContext } from "@/contexts/user";

export default function FormName() {
  const { changePassword } = useUserContext();

  const [inputValue, setInputValue] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [securityAsk, setSecurityAsk] = useState("");

  const toggleIsOpenModal = () => setIsOpenModal(!isOpenModal);

  const getSecureAsk = async () => {
    try {
      const response = await api.get(`/session/security-ask/${inputValue}`);

      setSecurityAsk(response.data.securityAsk);
      setNotFound(false);
      toggleIsOpenModal();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setNotFound(true);
      } else {
        toast.error("Erro ao tentar recuperar a pergunta de segurança");
      }
    }
  };

  const handleChangePassword = async (data: IChangePasswordRequest) => {
    delete data.confirmNewPassword;

    await changePassword(data, inputValue);
  };

  return (
    <>
      {isOpenModal && (
        <B.BaseModal toggleModal={toggleIsOpenModal}>
          <h2 className="text-[14pt] font-bold text-primary">
            Mudança de Senha
          </h2>
          <small className="text-center">
            Responda à pergunta de segurança abaixo e envie a sua nova senha
          </small>

          <p className="my-4 first-letter:uppercase text-secondary">
            {securityAsk}
          </p>

          <B.ChangePasswordForm handleChangePassword={handleChangePassword} />
        </B.BaseModal>
      )}
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          getSecureAsk();
        }}
      >
        <C.Input
          label="Nome"
          placeholder="Ex: JohnDoe"
          error={notFound ? "usuário não encontrado" : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div>
          <C.Button type="submit">
            <IoIosArrowForward className="text-4xl" />
          </C.Button>
        </div>
      </form>
    </>
  );
}
