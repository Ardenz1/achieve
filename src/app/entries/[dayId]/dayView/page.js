'use client';
import { useEffect, useState } from "react";
import MealHistoryCard from "@/components/MealHistoryCard";
import SummaryCard from "@/components/SummaryCard";
import { useRouter } from 'next/navigation';

export default function DayViewEntry() {
  const [selectedDate, setSelectedDate] = useState("");
  const [weight, setWeight] = useState(null); // State to store weight
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchDayEntry = async () => {
      const { pathname } = window.location; // Get the current pathname
      const dayEntryId = pathname.split('/').slice(-2, -1)[0]; // Extract the dayId from the URL
  
      if (!dayEntryId) {
        setError("No day entry ID provided.");
        return;
      }
  
      try {
        const response = await fetch(`/api/entries/${dayEntryId}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Failed to fetch day entry.");
          return;
        }
  
        const data = await response.json();
        if (data) {
          setSelectedDate(data.date.split("T")[0]);
          setWeight(data.weight); // Assuming weight is part of the returned data
        } else {
          setError("Data not found.");
        }
      } catch (error) {
        console.error("Error fetching day entry:", error);
        setError("An unexpected error occurred.");
      }
    };
  
    fetchDayEntry();
  }, []);

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

      {/* Entry Cards */}
      <div>
        <SummaryCard date={selectedDate} />
        <MealHistoryCard date={selectedDate} weight={weight} /> {/* Pass weight as a prop */}
      </div>
    </div>
  );
}
