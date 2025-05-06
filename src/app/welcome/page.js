import Link from 'next/link';

export default function WelcomePage() {
    return (
      <div className="relative h-screen overflow-hidden">
          <img
        src="iconNew.svg"
        alt="Logo"
        className="absolute top-8 left-6 transform -translate-x-1/2 -translate-y-1/2 md:w-[900px] md:h-auto"
      />
        <div className="relative h-screen flex flex-col items-center justify-center p-10"> 
        <h1 className="text-center font-bold mb-4 sm:w-[300px]  md:text-4xl md:w-[500px] break-words">
        Your health is your greatest investment—track it, nurture it, <span className="font-extrabold italic">achieve it</span>
      </h1>
      <div className="text-center pt-20 md:text-2xl z-10">
      <Link href="/authen/login">
            <p className="mb-2">Login</p>
          </Link>
        <hr className="my-5 border-t-4 border-achieve-green" />
        <Link href="/authen/createaccount">
            <p className="mb-2 ">Create Account</p>
          </Link>
      </div>
      </div>
      <img
        src="iconNew.svg"
        alt="Logo"
        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 md:w-[800px] md:text-2xl md:h-100 lg:w-[800px] lg:h-100 z-0 pointer-events-none"
        />
    </div>
    );
  }
  