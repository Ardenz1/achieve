'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../components/header";
import Footer from "../components/footer";
import CaloriesHomeCard from '@/components/CaloriesHomeCard';
import SummaryCardHome from '@/components/SummaryCardHome';
import MealSuggestions from '@/components/MealSuggestions';
import Info from '@/components/Info';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [today, setToday] = useState("");

  const [totals, setTotals] = useState({
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    totalFiber: 0,
    totalSugar: 0,
    totalSodium: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/welcome');
      return;
    }

    const fetchDayEntry = async () => {
      try {
        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];

        // Fetch day entry by today's date
        const response = await fetch(`/api/entries/getDayEntry?date=${today}`);
        const data = await response.json();
        console.log("Today's Day Entry:", data);

        if (data?.foodEntries) {
          // Calculate totals from today's food entries
          const newTotals = data.foodEntries.reduce((acc, foodEntry) => {
            acc.totalCalories += foodEntry.CalcCalories || 0;
            acc.totalCarbs += foodEntry.CalcCarbs || 0;
            acc.totalProtein += foodEntry.CalcProtein || 0;
            acc.totalFat += foodEntry.CalcFat || 0;
            acc.totalFiber += foodEntry.CalcFiber || 0;
            acc.totalSugar += foodEntry.CalcSugar || 0;
            acc.totalSodium += foodEntry.CalcSodium || 0;
            return acc;
          }, {
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFat: 0,
            totalFiber: 0,
            totalSugar: 0,
            totalSodium: 0,
          });

          console.log("Calculated Totals:", newTotals);
          setTotals(newTotals);
        } else {
          console.log("No food entries found for today.");
          setTotals({
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFat: 0,
            totalFiber: 0,
            totalSugar: 0,
            totalSodium: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDayEntry();
  }, [router]);

  const handleCreateDayEntry = async () => {
    const token = localStorage.getItem("token");
  
    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];
  
    try {
      const response = await fetch("/api/entries/createFoodDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, date: today }), // Use today's date
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
// bg-gradient-to-b from-achieve-white via-achieve-pink to-achieve-white 
  return (
    <div>
        <Header />
        <div className="bg-[url('/homebg9.png')] bg-cover bg-center bg-blend-overlay items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="text-center mb-10">
            <h1 className="font-bold text-4xl mb-10">Dashboard</h1>
            <button 
              onClick={handleCreateDayEntry} 
              className="bg-achieve-orange2 p-4 mt-6 text-xl rounded-md hover:bg-achieve-darkorange lg:px-36 lg:text-2xl lg:mb-10"
            >
              Create Entry
            </button>
          </div>
        
          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 lg:max-w-6xl lg:w-full mx-auto">
            {/* Left Column - CaloriesHomeCard */}
            <div className="lg:col-span-1">
              <CaloriesHomeCard totalCalories={totals.totalCalories} today={today} />
            </div>
            
            {/* Right Column - SummaryCardHome */}
            <div className="lg:col-span-1">
              <SummaryCardHome 
                carbs={totals.totalCarbs} 
                protein={totals.totalProtein} 
                fat={totals.totalFat} 
                fiber={totals.totalFiber} 
                sugar={totals.totalSugar} 
                sodium={totals.totalSodium} 
              />
            </div>
          </div>
        
          {/* Below Section for MealSuggestions and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-52">
            <div>
              <MealSuggestions />
            </div>
            <div>
              <Info />
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}
