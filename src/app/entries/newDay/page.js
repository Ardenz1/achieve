'use client';
import { useEffect, useState } from "react";
import MealHistoryCard from "@/components/MealHistoryCard";
import SummaryCard from "@/components/SummaryCard";
import WeightBar from "@/components/WeightBar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewEntry() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); 
  const [weight, setWeight] = useState(null);  
  const [error, setError] = useState(null);
  const [dayEntryId, setDayEntryId] = useState(""); 

  useEffect(() => {
    const fetchDayEntry = async () => {
      const { searchParams } = new URL(window.location.href);
      const id = searchParams.get("dayEntryId");
      
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
          setWeight(data.weight);  // Set the weight from the fetched data
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

      // After saving, fetch the updated data to get the new weight
      const updatedResponse = await fetch(`/api/entries/${dayEntryId}`);
      const updatedData = await updatedResponse.json();
      if (updatedData && updatedData.weight) {
        setWeight(updatedData.weight);  // Update the weight state with the new value
      }

    } catch (error) {
      console.error("Error updating weight:", error);
      setError("An unexpected error occurred while updating the weight.");
    }
  };

  return (
    <div>
      <Link href="/entries">
        <i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-bluepurple"></i>
      </Link>

      <div className="relative min-h-screen bg-[url('/dayviewbg2.png')] bg-cover bg-center p-8 sm:p-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* {error && <div className="text-red-500">{error}</div>} */}
          <div className="bg-achieve-bluepurple p-4 rounded-lg inline-block text-3xl">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-achieve-grey text-3xl outline-none"
            />
          </div>
        </div>

        {/* Empty summary and meal history since it's a new entry */}
        <div className="w-full max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SummaryCard         
            date={selectedDate} 
          />
          <MealHistoryCard dayId={dayEntryId} date={selectedDate} weight={weight} />
        </div>

        {/* Weight Bar & Create Entry Button */}
        <div className="w-full max-w-4xl mx-auto mt-12 flex flex-col items-center">
          <WeightBar 
            date={selectedDate} 
            weight={weight} 
            onSave={handleWeightSave} 
          />
        </div>
      </div>
    </div>
  );
}



// 'use client';
// import { useEffect, useState } from "react";
// import MealHistoryCard from "@/components/MealHistoryCard";
// import SummaryCard from "@/components/SummaryCard";
// import { useRouter } from 'next/navigation';

// export default function NewEntry() {
//   const [selectedDate, setSelectedDate] = useState(""); 
//   const [dayEntryId, setDayEntryId] = useState(""); 
//   const [error, setError] = useState(null);
//   const router = useRouter();
  
//   useEffect(() => {
//     const fetchDayEntry = async () => {
//       const { searchParams } = new URL(window.location.href);
//       const id = searchParams.get("dayEntryId");
//       console.log( "dayuENtry!",id);
      
//       if (!id) {
//         setError("No day entry ID provided.");
//         return;
//       }

//       setDayEntryId(id);

//       try {
//         const response = await fetch(`/api/entries/${id}`);
//         if (!response.ok) {
//           const data = await response.json();
//           setError(data.error || "Failed to fetch day entry.");
//           return;
//         }

//         const data = await response.json();
//         if (data && data.date) {
//           setSelectedDate(data.date.split("T")[0]); 
//         } else {
//           setError("Date not found.");
//         }
//       } catch (error) {
//         console.error("Error fetching day entry:", error);
//         setError("An unexpected error occurred.");
//       }
//     };

//     fetchDayEntry();
//   }, []);

//   return (
//     <div className="relative bg-gradient-to-b from-achieve-white via-achieve-bluepurple grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {/* Date Display */}
//       <div className="self-start justify-self-start w-full">
//         {error && <div className="text-red-500">{error}</div>}
//         <div className="bg-achieve-bluepurple p-4 rounded-lg w-max text-3xl">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="bg-transparent text-achieve-grey text-3xl outline-none"
//             readOnly // Make it read-only if you don't want the user to change it
//           />
//         </div>
//       </div>

//       {/* Entry Cards */}
//       <div>
//         <SummaryCard date={selectedDate} />
//         <MealHistoryCard date={selectedDate} dayId={dayEntryId}/>
//       </div>
//     </div>
//   );
// }
