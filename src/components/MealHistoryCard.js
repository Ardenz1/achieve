import MealBarEntry from "./MealBarEntry";
import Link from 'next/link';

const MealHistoryCard = ({ weight }) => { // Accept weight as a prop
  const meals = [
    { id: 1, name: "Cheese Stick", calories: 150 },
    { id: 2, name: "Grilled Chicken", calories: 300 },
    { id: 3, name: "Salad", calories: 120 },
  ];

  return (
    <div className="bg-achieve-green mt-20 p-8 md:p-12 rounded-lg w-full max-w-2xl flex flex-col gap-6">
      <div className="flex justify-center items-center">
        <h1 className="text-lg font-bold text-center px-4">Meal History</h1>
        <Link href="/" title="Add new food entry" >
          <i className="fa-solid fa-plus text-lg  hover:text-achieve-white"></i>
        </Link>
      </div>

      <div className="space-y-4">
        {meals.map((meal) => (
          <MealBarEntry key={meal.id} name={meal.name} calories={meal.calories} />
        ))}
      </div>

      {/* Display weight if available */}
      {weight !== null && (
        <div className="mt-6 flex flex-col items-center">
          <label className="font-semibold mb-2">
            Your Weight: {weight} lbs
          </label>
        </div>
      )}
    </div>
  );
};

export default MealHistoryCard;
