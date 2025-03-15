import Link from 'next/link';

const Header = () => {
    return (
        <div className="bg-achieve-white pb-5 mb-1 flex shadow-md  justify-between items-center px-5">
        {/* Left Side: Image and Heading */}
        <div className="flex flex-col items-center pt-2">
        <Link href="/">
          <img className="w-12 h-12 cursor-pointer" src="/AchieveLogo2.svg" alt="Logo" />
        </Link>
          <h1 className="text-achieve-grey text-sm">Achieve</h1>
        </div>
      
        {/* Right Side: Icons */}
        <div className="flex space-x-8 mt-5">
          <div className="flex flex-col items-center">
            <Link href="/entries" className="relative flex flex-col items-center">

              <i className="fa-solid fa-bookmark  border-solid text-achieve-yellow text-4xl"></i>
              <i className="fa-solid fa-pencil text-achieve-grey text-lg cursor-pointer absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              
              <p className="text-achieve-grey text-sm ">Entries</p>
            </Link>
          </div>
 


          <Link href="/authen/profile" className="relative flex flex-col items-center">
            {/* Solid Circle */}
            <i className="fa-solid fa-circle text-achieve-pink text-4xl"></i>
            <img 
              className="w-5 h-5 cursor-pointer absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
              src="/profile2.svg" 
              alt="Profile"
            />

            <p className="text-achieve-grey text-sm ">Profile</p>
          </Link>
        </div>

      </div>
      
    )
}

export default Header;