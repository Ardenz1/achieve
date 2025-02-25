"use client";
import { useEffect, useState } from "react";
import EntryCard from "../../components/EntryCard";
import { useRouter } from "next/navigation";

export default function Entry() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Track selected date
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decodeToken = (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    };

    const decodedToken = decodeToken(token);
    const userId = decodedToken?.userId;
    if (!userId) return;

    const fetchEntries = async () => {
      const response = await fetch(`/api/entries?userId=${userId}`);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  const handleCreateDayEntry = async () => {
    const token = localStorage.getItem("token");
    if (!selectedDate) {
      setError("Please select a date before proceeding.");
      return;
    }
    
    console.log("Selected Date (Before API Request):", selectedDate);
    try {
      const response = await fetch("/api/entries/createFoodDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, date: selectedDate }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create day entry.");
        return;
      }

      const data = await response.json();
      console.log("Full API Response:", data);
      console.log("Returned Date from API:", data.date);
      
      const newDayEntryId = data.dayEntryId;
      router.push(`/entries/newDay?dayEntryId=${newDayEntryId}`);
    } catch (error) {
      console.error("Error creating day entry:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-achieve-white via-achieve-seagreen grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-3xl font-bold mb-4">All Entries</h1>

      <div className="flex items-center flex-row-reverse gap-4">
      {/* Date Picker Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-3xl text-achieve-seagreen cursor-pointer"
        >
          <i className="fa-solid fa-calendar-days"></i>
        </button>

        {/* Display selected date */}
        {selectedDate && <span className="text-xl">{selectedDate}</span>}
      </div>

      {/* Create Entry Button */}
      <button
        onClick={handleCreateDayEntry}
        className="bg-achieve-seagreen p-4 text-xl rounded-md hover:bg-achieve-yellow"
      >
        Add New Entry
      </button>
      </div>
      
      {/* Calendar Input */}
      {showCalendar && (
        <input
          type="date"
          className="border p-2 rounded-md text-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      )}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
     

      {/* Entries List */}
      {entries.map((entry, index) => (
        <EntryCard key={index} entry={entry} />
      ))}
    </div>
  );
}
