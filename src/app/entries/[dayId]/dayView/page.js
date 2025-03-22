'use client';
import { useEffect, useState } from "react";
import MealHistoryCard from "@/components/MealHistoryCard";
import SummaryCard from "@/components/SummaryCard";
import WeightBar from "@/components/WeightBar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DayViewEntry() {
  const [selectedDate, setSelectedDate] = useState("");
  const [weight, setWeight] = useState(null);  // Initialize as null to ensure we fetch the correct value
  const [foodEntries, setFoodEntries] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [dayEntryId, setDayEntryId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  // Move the fetchDayEntry function outside of useEffect
  const fetchDayEntry = async () => {
    const { pathname } = window.location;
    const id = pathname.split('/').slice(-2, -1)[0];
    setDayEntryId(id);

    if (!id) {
      setError("No day entry ID provided.");
      return;
    }

    try {
      const response = await fetch(`/api/entries/${id}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to fetch day entry.");
        return;
      }

      const data = await response.json();

      if (data) {
        setSelectedDate(data.date.split("T")[0]);
        setWeight(data.weight); 
        setFoodEntries(data.foodEntries);  // Set foodEntries from the response
      } else {
        setError("Data not found.");
      }
    } catch (error) {
      console.error("Error fetching day entry:", error);
      setError("An unexpected error occurred.");
    }
  };

  // Calculate nutritional totals
  const calculateTotals = (foodEntries) => {
    return foodEntries.reduce((totals, food) => {
      totals.Calories += food.CalcCalories || 0;
      totals.Carbs += food.CalcCarbs || 0;
      totals.Protein += food.CalcProtein || 0;
      totals.Fat += food.CalcFat || 0;
      totals.Fiber += food.CalcFiber || 0;
      totals.Sugar += food.CalcSugar || 0;
      totals.Sodium += food.CalcSodium || 0;
      return totals;
    }, {
      Calories: 0,
      Carbs: 0,
      Protein: 0,
      Fat: 0,
      Fiber: 0,
      Sugar: 0,
      Sodium: 0,
    });
  };

  const totals = calculateTotals(foodEntries);

  useEffect(() => {
    fetchDayEntry();
  }, []);

  const handleDelete = async () => {
       try {
      const response = await fetch(`/api/entries/${dayEntryId}/delete/deleteFoodDay`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete entry.");
        return;
      }

      setSuccessMessage("Entry deleted successfully! Redirecting...");
      setTimeout(() => {
        router.push("/entries");
      }, 2000);
    } catch (error) {
      console.error("Error deleting entry:", error);
      setError("An unexpected error occurred while deleting.");
    }
  };

  // Function to save the updated weight and re-fetch the day entry
  const handleWeightSave = async (newWeight) => {
    try {
      const response = await fetch(`/api/entries/${dayEntryId}/edit/editWeight`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: newWeight }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to update weight.");
        return;
      }

      const data = await response.json();
      await fetchDayEntry();

    } catch (error) {
      console.error("Error updating weight:", error);
      setError("An unexpected error occurred while updating the weight.");
    }
  };

  return (
    <div><Link href="/entries"><i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-bluepurple"></i></Link>

    <div className="relative min-h-screen bg-[url('/dayviewbg2.png')] bg-cover bg-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Date Picker & Error Message */}
      <div className="w-full max-w-7xl mx-auto">
        {error && <div className="text-red-500">{error}</div>}
        <div className="bg-achieve-bluepurple p-4 rounded-lg inline-block text-3xl">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-achieve-grey text-3xl outline-none"
            readOnly
          />
        </div>
      </div>
  
      {/* Summary & Meal History */}
      <div className="w-full max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <SummaryCard 
          calories={totals.Calories}
          carbs={totals.Carbs}
          protein={totals.Protein}
          fat={totals.Fat}
          fiber={totals.Fiber}
          sugar={totals.Sugar}
          sodium={totals.Sodium}
          date={selectedDate} 
        />
        <MealHistoryCard dayId={dayEntryId} date={selectedDate} weight={weight} />
      </div>
  
      {/* Weight Bar & Delete Button */}
      <div className="w-full max-w-4xl mx-auto mt-12 flex flex-col items-center">
        <WeightBar
          date={selectedDate}
          weight={weight}
          onSave={handleWeightSave}
        />
        <button 
          onClick={handleDelete} 
          className="mt-10 w-48 p-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-achieve-green transition">
          Delete Entry
        </button>
        {successMessage && <p className="text-achieve-orange">{successMessage}</p>}
      </div>
    </div>
    </div>
  );
  
}
