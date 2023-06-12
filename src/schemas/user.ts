import * as z from "zod";

export const userCreateSchema = z
  .object({
    name: z
      .string()
      .nonempty("campo obrigatório")
      .min(5, "no mínimo 5 caracteres")
      .max(30, "no máximo 30 caracteres")
      .regex(/^[a-zA-Z0-9]*$/, "apenas letras e números"),

    securityAsk: z
      .string()
      .nonempty("campo obrigatório")
      .min(4, "no mínimo 4 caracteres"),

    securityAnswer: z
      .string()
      .nonempty("campo obrigatório")
      .min(4, "mínimo 4 caracteres"),

    password: z
      .string()
      .nonempty("campo obrigatório")
      .regex(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
      .regex(/([a-z])/, "deve conter ao menos 1 letra minúscula")
      .regex(/(\d)/, "deve conter ao menos 1 número")
      .regex(/(\W)/, "deve conter ao menos 1 caracter especial")
      .min(8, "no mínimo 8 caracteres"),

    confirmPassword: z.string().nonempty("campo obrigatório"),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "senhas não são iguais",
    path: ["confirmPassword"],
  });

export const userUpdateSchema = z
  .object({
    name: z.string().optional(),

    securityAsk: z.string().optional(),

    securityAnswer: z.string().optional(),

    password: z.string().optional(),

    confirmPassword: z.string().optional(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "senhas não são iguais",
    path: ["confirmPassword"],
  });
