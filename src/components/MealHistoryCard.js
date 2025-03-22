import { useEffect, useState } from "react";
import MealBarEntry from "./MealBarEntry";
import Link from 'next/link';

const MealHistoryCard = ({ dayId, weight }) => { // Updated prop name to match
  const [foodEntries, setFoodEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodEntries = async () => {
      console.log("Fetching food entries for day ID:", dayId); // Log the day ID

      try {
        const response = await fetch(`/api/entries/${dayId}/getFoodEntries`);
        if (!response.ok) {
          throw new Error("Failed to fetch food entries.");
        }
        const data = await response.json();
        console.log("Food entries response:", data); // Log the data

        setFoodEntries(data);
      } catch (error) {
        console.error("Error fetching food entries:", error);
        setError(error.message);
      }
    };

    if (dayId) { 
      fetchFoodEntries();
    }
  }, [dayId]);

  return (
    <div className="bg-achieve-white border-2 border-achieve-bluepurple mt-10 p-8 md:p-12 lg:mt-0 rounded-lg w-full max-w-2xl flex flex-col gap-6">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-center px-4 text-achieve-grey">Meal History</h1>
        <Link href={`/entries/${dayId}/newFood`} title="Add new food entry">
          <i className="fa-solid fa-plus text-lg text-achieve-grey hover:text-achieve-bluepurple"></i>
        </Link>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        {foodEntries.map((meal) => (
          <MealBarEntry key={meal.id} name={meal.mealName} calories={meal.CalcCalories}  dayId={dayId} foodId={meal.id}/>
        ))}
      </div>
    </div>
  );
};

export default MealHistoryCard;
