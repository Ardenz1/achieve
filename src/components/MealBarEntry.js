import Link from 'next/link';

const MealBarEntry = ({ name, calories }) => {
    return (
      <div className="bg-achieve-grey w-full p-4 rounded-md text-white flex justify-between items-center">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-200">{calories} kcal</span>
        <Link href="/">
        <i className="fa-solid fa-pencil hover:text-achieve-green"></i>
        </Link>
      </div>
    );
  };
  
  export default MealBarEntry;
  