import * as B from "@/blocks";

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-[18pt] font-bold mb-4">Esqueceu sua senha?</h1>

      <p>Digite aqui o seu nome de usuário</p>

      <section>
        <B.FormName />
      </section>
    </section>
  );
}
