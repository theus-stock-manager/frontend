import * as z from "zod";

export const userLoginSchema = z.object({
  name: z
    .string()
    .nonempty("campo obrigatório")
    .regex(/^\S*$/, "não pode haver espaços em branco"),

  password: z
    .string()
    .nonempty("campo obrigatório")
    .regex(/^\S*$/, "não pode haver espaços em branco"),
});

export const changePasswordSchema = z
  .object({
    securityAnswer: z.string().nonempty("campo obrigatório"),

    newPassword: z
      .string()
      .nonempty("campo obrigatório")
      .regex(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
      .regex(/([a-z])/, "deve conter ao menos 1 letra minúscula")
      .regex(/(\d)/, "deve conter ao menos 1 número")
      .regex(/(\W)/, "deve conter ao menos 1 caracter especial")
      .min(8, "no mínimo 8 caracteres"),

    confirmNewPassword: z.string().nonempty("campo obrigatório"),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    { message: "Senhas não são iguais", path: ["confirmNewPassword"] }
  );
