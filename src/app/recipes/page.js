import Link from 'next/link';
export default function Info() {
    return (
      <div><Link href="/"><i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-purple"></i></Link>

      <div className=" bg-gradient-to-b from-achieve-white via-achieve-purple grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="weight-700 font-bold text-4xl">This is the recipies Page!</h1>
        </main>
      
      </div>
      </div>
    );
  }
  