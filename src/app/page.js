'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/welcome');
    }
  }, []);

  return (
    <div>
    <Header />
    <div className="bg-gradient-to-b from-achieve-white via-achieve-pink to-achieve-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="weight-700 font-bold text-4xl">I think this is the home page </h1>
      </main>
    </div>
    <Footer/>
      </div>
  );
}
