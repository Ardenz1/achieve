"use client";
import { useEffect, useState } from "react";
import EntryCard from "../../components/EntryCard";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Entry() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found.");
      return;
    }

    const decodeToken = (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    };

    const decodedToken = decodeToken(token);
    const userId = decodedToken?.userId;

    if (!userId) {
      console.warn("User ID not found in the token.");
      return;
    }

    const fetchEntries = async () => {
      const response = await fetch(`/api/entries?userId=${userId}`);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  const handleCreateDayEntry = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch('/api/entries/createFoodDay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setError("Failed to create day entry.");
        }
        return;
      }
  
      const data = await response.json();
      const newDayEntryId = data.dayEntryId; // Access dayEntryId directly
      console.log("newEntryId", newDayEntryId);
      console.log("data", data);
      router.push(`/entries/newDay?dayEntryId=${newDayEntryId}`); // Redirect with dayEntryId
    } catch (error) {
      console.error("Error creating day entry:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-achieve-white via-achieve-seagreen grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-3xl font-bold mb-4">All Entries</h1>
      <button 
        onClick={handleCreateDayEntry} 
        className="bg-achieve-seagreen p-4 text-xl rounded-md hover:bg-achieve-yellow"
      >
        Add New Entry
      </button>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      {entries.map((entry, index) => (
        <EntryCard key={index} entry={entry} />
      ))}
    </div>
  );
}
