"use client";

import * as C from "@/components";
import { useUserContext } from "@/contexts/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaBuilding, FaUser } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

export default function StaffPanelPage() {
  const router = useRouter();
  const { logout, protectStaffRoute } = useUserContext();

  useEffect(() => {
    protectStaffRoute();
  }, []);
  return (
    <section className="flex items-center justify-center w-full h-full gap-4 px-20 max-sm:flex-col max-sm:px-4 max-sm:gap-2">
      <MdExitToApp
        onClick={logout}
        className="absolute text-4xl cursor-pointer top-4 right-4"
      />

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
