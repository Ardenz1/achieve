import Link from 'next/link';
const MealSuggestions = () => {
    return (
        <Link href="/recipes">
        <div>
            <div className="w-full max-w-2xl text-center text-4xl text-bold rounded-xl mt-20 pl-10 pr-10 pt-8 pb-8 text-achieve-grey bg-[url('/foodWbg.png')] bg-cover bg-center">
            <h1 className="font-bold"> Meal Suggestions</h1>
            </div>
        </div>
        </Link>
    );
  };
  
  export default MealSuggestions;
  