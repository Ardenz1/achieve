import Link from 'next/link';

const Header = () => {
    return (
        <div className="bg-achieve-grey pb-5 flex justify-between items-center px-5">
        {/* Left Side: Image and Heading */}
        <div className="flex flex-col items-center pt-2">
        <Link href="/">
          <img className="w-10 h-10 cursor-pointer" src="/logoAchieve.svg" alt="Logo" />
        </Link>
          <h1 className="text-white text-sm font-thin">Achieve</h1>
        </div>
      
        {/* Right Side: Icons */}
        <div className="flex space-x-4">
          <i className="fa-solid fa-bookmark text-achieve-yellow text-4xl"></i>
          <i className="fa-solid fa-circle text-achieve-pink text-4xl"></i>
        </div>
      </div>
      
    )
}

export default Header;