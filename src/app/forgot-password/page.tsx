"use client";

import * as B from "@/blocks";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <IoArrowBackCircleOutline
        onClick={() => router.back()}
        className="absolute text-5xl cursor-pointer top-4 left-4"
      />

      <h1 className="text-[18pt] font-bold mb-4">Esqueceu sua senha?</h1>

      <ul className="px-8 mb-4 list-disc w-72">
        <li className="text-[7pt]">
          Digite o seu nome de usuário no campo abaixo.
        </li>

        <li className="text-[7pt] text-zinc-400">
          Responda a pergunta de segurança
        </li>

        <li className="text-[7pt]">Defina uma nova senha forte</li>

        <li className="text-[7pt] text-zinc-400">
          Caso a resposta seja errada, o seu usuário será bloqueado e deverá
          entrar em contato com a staff do sistema para desbloquear
        </li>
      </ul>

      <section>
        <B.FormName />
      </section>
    </section>
  );
}
