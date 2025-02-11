import Link from 'next/link';

const Header = () => {
    return (
        <div className="bg-achieve-grey pb-5 flex justify-between items-center px-5">
        {/* Left Side: Image and Heading */}
        <div className="flex flex-col items-center pt-2">
        <Link href="/">
          <img className="w-12 h-12 cursor-pointer" src="/logoAchieve.svg" alt="Logo" />
        </Link>
          <h1 className="text-white text-sm font-thin">Achieve</h1>
        </div>
      
        {/* Right Side: Icons */}
        <div className="flex space-x-8 mt-5">
          <div className="flex flex-col items-center">
            <Link href="/entries" className="relative flex flex-col items-center">

              <i className="fa-solid fa-bookmark text-achieve-yellow text-4xl"></i>
              <i className="fa-solid fa-pencil text-white text-xl cursor-pointer absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              
              <p className="text-white text-sm font-thin">Entries</p>
            </Link>
          </div>
 


          <Link href="/authen/profile" className="relative flex flex-col items-center">
            {/* Solid Circle */}
            <i className="fa-solid fa-circle text-achieve-pink text-4xl"></i>
            <img 
              className="w-5 h-5 cursor-pointer absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
              src="/profile.svg" 
              alt="Profile"
            />

            <p className="text-white text-sm font-thin">Profile</p>
          </Link>
        </div>

      </div>
      
    )
}

export default Header;