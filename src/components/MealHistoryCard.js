import MealBarEntry from "./MealBarEntry";
import Link from 'next/link';


const MealHistoryCard = () => {
  // Mock meal data (replace with real state later)
  const meals = [
    { id: 1, name: "Cheese Stick", calories: 150 },
    { id: 2, name: "Grilled Chicken", calories: 300 },
    { id: 3, name: "Salad", calories: 120 },
    
  ];

  return (
    <div className="bg-achieve-green mt-20 p-8 md:p-12 rounded-lg w-full max-w-2xl flex flex-col gap-6">
      {/* Header - Centered */}
      <div className="flex justify-center items-center">
      <h1 className="text-lg font-bold text-center px-4">Meal History</h1>
      <Link href="/" title="Add new food entry" >
      <i className="fa-solid fa-plus text-lg  hover:text-achieve-white"></i>
      </Link>
      </div>

      {/* Meal List - Full width bars */}
      <div className="space-y-4">
        {meals.map((meal) => (
          <MealBarEntry key={meal.id} name={meal.name} calories={meal.calories} />
        ))}
      </div>

      {/* Weight Input at Bottom */}
      <div className="mt-6 flex flex-col items-center">
        <label className="font-semibold mb-2">
          Enter Your Weight
        </label>
        <input
          id="weight"
          placeholder="e.g., 150 lbs"
          className="w-full p-2 rounded-md text-center border-2 border-achieve-grey"
        />
      </div>
    </div>
  );
};

export default MealHistoryCard;

  
    