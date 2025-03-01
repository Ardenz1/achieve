'use client';
import { useEffect, useState } from "react";
import MealHistoryCard from "@/components/MealHistoryCard";
import SummaryCard from "@/components/SummaryCard";
import WeightBar from "@/components/WeightBar";
import { useRouter } from 'next/navigation';

export default function DayViewEntry() {
  const [selectedDate, setSelectedDate] = useState("");
  const [weight, setWeight] = useState(null);  // Initialize as null to ensure we fetch the correct value
  const [error, setError] = useState(null);
  const router = useRouter();
  const [dayEntryId, setDayEntryId] = useState("");

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
      } else {
        setError("Data not found.");
      }
    } catch (error) {
      console.error("Error fetching day entry:", error);
      setError("An unexpected error occurred.");
    }
  };

  // Use useEffect to fetch the initial day entry when the component mounts
  useEffect(() => {
    fetchDayEntry();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/entries/${dayEntryId}/delete/deleteFoodDay`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete entry.");
        return;
      }

      // If successful, redirect the user or show a success message
      alert("Entry deleted successfully!");
      router.push("/");  // Redirect to home or another page after deletion
    } catch (error) {
      console.error("Error deleting entry:", error);
      setError("An unexpected error occurred while deleting.");
    }
  };

  // Function to save the updated weight and re-fetch the day entry
  const handleWeightSave = async (newWeight) => {
    try {
      const response = await fetch(`/api/entries/${dayEntryId}/edit/editWeight`, {
        method: 'PUT', // Use PUT to update the resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: newWeight }), // Send the updated weight
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
    <div className="relative bg-gradient-to-b from-achieve-white via-achieve-bluepurple grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="self-start justify-self-start w-full">
        {error && <div className="text-red-500">{error}</div>}
        <div className="bg-achieve-bluepurple p-4 rounded-lg w-max text-3xl">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-achieve-grey text-3xl outline-none"
            readOnly
          />
        </div>
      </div>

      <div className="w-full max-w-7xl px-4">
        {/* Grid container for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 1 lg:grid-cols-2 gap-20">
          <SummaryCard date={selectedDate} />
          <MealHistoryCard dayId={dayEntryId} date={selectedDate} weight={weight} />
        </div>

        {/* Centered WeightBar for large screens */}
        <div className="pt-10 flex flex-col items-center lg:mt-8">
          <h1 className="text-2xl font-bold">Weight</h1>
          <WeightBar
            date={selectedDate}
            weight={weight}
            onSave={handleWeightSave} // Pass the handleWeightSave function to WeightBar
            className="w-[40%]"
          />
          <button onClick={handleDelete} className=" w-48 sm:max-w-md p-3 bg-red-500 text-white mt-20 rounded-lg text-lg font-semibold hover:bg-achieve-green transition">
            Delete Entry
          </button>
        </div>
      </div>
    </div>
  );
}
