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
