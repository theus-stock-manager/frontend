import * as z from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .nonempty("campo obrigatório")
    .min(3, "no mínimo 3 caracteres"),

  image: z.string().optional(),
});

export const editCompanySchema = z.object({
  name: z.string().optional(),

  image: z.string().optional(),
});
