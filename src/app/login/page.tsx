"use client";
import Link from "next/link";
import * as B from "@/blocks";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <section className="flex items-center justify-center w-full h-full">
      <FaHome
        onClick={() => router.push("/")}
        className="absolute text-4xl cursor-pointer top-4 left-4"
      />

      <div className="w-[17.5rem] flex flex-col justify-center items-center gap-4 py-8 px-4 rounded-lg bg-[#636e72] custom-box-shadow">
        <h1 className="text-[16pt] text-white font-bold mb-2">
          Faça o seu login
        </h1>

        <B.LoginForm />

        <p className="text-[8pt]">
          Esqueceu sua senha?{" "}
          <Link
            className="text-[10pt] text-[#CAD3C8] font-normal transition-all hover:inline-block hover:translate-y-[-0.1rem] hover:text-[#82ccdd] hover:transition-all"
            href="/forgot-password"
          >
            Solicite
          </Link>{" "}
          a recuperação.
        </p>
      </div>
    </section>
  );
}
