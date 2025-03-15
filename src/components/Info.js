import Link from 'next/link';
const Info = () => {
    return (
        <Link href="/info">
        <div>
            <div className="w-full max-w-2xl text-center text-4xl text-bold rounded-xl lg:mt-20 pl-10 pr-10 pt-8 pb-8 text-achieve-grey bg-[url('/InfoWbg.png')] bg-cover bg-center">
            <h1 className="font-bold"> Nutrition Info</h1>
            </div>
        </div>
        </Link>
    );
  };
  
  export default Info;
  