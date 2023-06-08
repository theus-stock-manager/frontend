import Contexts from "@/contexts";
import "@/styles/main.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Manager",
  description: "Um gerenciador de estoque simples para pessoas simples",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-zinc-800 max-md:px-4 px-20 py-4`}>
        <Contexts>{children}</Contexts>
      </body>
    </html>
  );
}
