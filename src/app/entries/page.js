"use client";
import { useEffect, useState } from "react";
import EntryCard from "../../components/EntryCard";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function Entry() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // Track selected date
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/welcome');
      return;
    }

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
      console.log("Entries fetched:", data);
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
    // <div><Link href="/"><i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-pink"></i></Link>
    <div className="relative bg-[url('/allEntriesbg2.png')] bg-cover bg-center grid items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <Link href="/">
          <i className="absolute top-5 left-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-pink"></i>
        </Link>
      <h1 className="text-center text-4xl font-bold mb-4">All Entries</h1>

      <div className="flex items-center flex-row-reverse gap-4">

      <div>    {/* Calendar Input */}
      {showCalendar && (
        <input
          type="date"
          className="border p-2 rounded-md text-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      )} </div>
      {/* Date Picker Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-3xl text-achieve-bluepurple cursor-pointer hover:text-blue-300"
        >
          <i className="fa-solid fa-calendar-days"></i>
        </button>

        {/* Display selected date */}
        {selectedDate && <span className="text-xl">{selectedDate}</span>}
      </div>

      {/* Create Entry Button */}
      <button
        onClick={handleCreateDayEntry}
        className="bg-achieve-bluepurple p-4 text-xl rounded-md hover:bg-blue-300">
        Add New Entry
      </button>
       </div>
      
  
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
     
      <div className="grid min-h-screen grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-4">

      {/* Entries List */}
      {entries.map((entry, index) => (
        <EntryCard key={index} entry={entry}  className="w-full h-full" />
      ))}
      </div>
    </div>
    // </div>
  );
}
