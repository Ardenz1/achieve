'use client';
import { useEffect, useState } from "react";
import MealHistoryCard from "@/components/MealHistoryCard";
import SummaryCard from "@/components/SummaryCard";
import { useRouter } from 'next/navigation';

export default function NewEntry() {
  const [selectedDate, setSelectedDate] = useState(""); 
  const [dayEntryId, setDayEntryId] = useState("");  // Added dayEntryId state
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchDayEntry = async () => {
      const { searchParams } = new URL(window.location.href);
      const id = searchParams.get("dayEntryId");
      console.log( "dayuENtry!",id);
      
      if (!id) {
        setError("No day entry ID provided.");
        return;
      }

      setDayEntryId(id);

      try {
        const response = await fetch(`/api/entries/${id}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Failed to fetch day entry.");
          return;
        }

        const data = await response.json();
        if (data && data.date) {
          setSelectedDate(data.date.split("T")[0]); 
        } else {
          setError("Date not found.");
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
      {/* Date Display */}
      <div className="self-start justify-self-start w-full">
        {error && <div className="text-red-500">{error}</div>}
        <div className="bg-achieve-bluepurple p-4 rounded-lg w-max text-3xl">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-achieve-grey text-3xl outline-none"
            readOnly // Make it read-only if you don't want the user to change it
          />
        </div>
      </div>

      {/* Entry Cards */}
      <div>
        <SummaryCard date={selectedDate} />
        <MealHistoryCard date={selectedDate} dayId={dayEntryId}/>
      </div>
    </div>
  );
}
