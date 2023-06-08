"use client";
import * as C from "@/components";
import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";

export default function Home() {
  const [activeOpt, setActiveOpt] = useState("teste 1");
  const options = [
    "teste 1",
    "teste 2",
    "teste 3",
    "teste 4",
    "teste 5",
    "teste 6",
  ];

  return (
    <>
      <h1>Home</h1>
      <Link href="/login">Ir para Login</Link>
    </>
  );
}
