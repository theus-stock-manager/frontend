"use client";

import * as C from "@/components";
import { useRouter } from "next/navigation";
import { FaBuilding, FaUser } from "react-icons/fa";

export default function StaffPanelPage() {
  const router = useRouter();

  return (
    <section className="flex max-sm:flex-col items-center justify-center w-full h-full gap-4 px-20 max-sm:px-4 max-sm:gap-2">
      <C.StaffCard
        icon={FaBuilding}
        label="Empresas"
        onAction={() => router.push("/staff-panel/companies")}
      />
      <C.StaffCard
        icon={FaUser}
        label="Usuários"
        onAction={() => router.push("/staff-panel/users")}
      />
    </section>
  );
}
