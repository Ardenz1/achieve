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

    if (dayId) { // Only fetch if dayId is defined
      fetchFoodEntries();
    }
  }, [dayId]);

  return (
    <div className="bg-achieve-green mt-20 p-8 md:p-12 rounded-lg w-full max-w-2xl flex flex-col gap-6">
      <div className="flex justify-center items-center">
        <h1 className="text-lg font-bold text-center px-4">Meal History</h1>
        <Link href={`/entries/${dayId}/newFood`} title="Add new food entry">
          <i className="fa-solid fa-plus text-lg hover:text-achieve-white"></i>
        </Link>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        {foodEntries.map((meal) => (
          <MealBarEntry key={meal.id} name={meal.mealName} calories={meal.CalcCalories} />
        ))}
      </div>
    </div>
  );
};

export default MealHistoryCard;
