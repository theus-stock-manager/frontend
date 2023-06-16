"use client";

import * as C from "@/components";
import * as T from "./types";
import { useForm } from "react-hook-form";
import { IChangePasswordRequest } from "@/globalTypes/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/session";

export default function ChangePasswordForm({
  handleChangePassword,
}: T.IChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="flex flex-col w-full gap-2 mb-2"
    >
      <C.Input
        label="Resposta"
        placeholder="Digite sua resposta"
        error={errors.securityAnswer?.message}
        {...register("securityAnswer")}
      />
      <C.Input
        label="Nova Senha"
        placeholder="Digite sua nova senha"
        type="password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <C.Input
        label="Confirmação"
        placeholder="Confirme a senha"
        type="password"
        error={errors.confirmNewPassword?.message}
        {...register("confirmNewPassword")}
      />
      <C.Button type="submit">Mudar Senha</C.Button>
    </form>
  );
}
