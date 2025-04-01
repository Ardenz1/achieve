'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function NewFoodEntry() {
  const [userId, setUserId] = useState(null);
  const [mealName, setmealName] = useState(""); 
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [sodium, setSodium] = useState("");
  const [units, setUnits] = useState("grams");
  const [amount, setAmount] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dayId, setDayId] = useState(null);

  // Fetch user data to get userId
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found.");
        return; // Exit early if no token
      }

      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("data from user", data);

        if (!response.ok) {
          console.error("Error from API:", data.error);
        } else {
          setUserId(data.user.id); 
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchUserData();
  }, []);

  // Extract dayId from the URL using window.location
  useEffect(() => {
    const path = window.location.pathname; // Get the full URL path
    const match = path.match(/\/entries\/([^/]+)\/newFood/); // Regex to extract dayId from URL
    if (match && match[1]) {
      setDayId(match[1]); // Extracted dayId
      console.log("Extracted dayId from URL:", match[1]);
    }
  }, []);

 const handleSubmit = async () => {
  if (!userId) {
    console.error("User ID is missing. Cannot submit the form.");
    setError("User not found. Please refresh and try again.");
    return;
  }

  setLoading(true);
  setError(null);

  // Convert input values
  const parsedAmount = parseFloat(amount) || 0;
  const parsedServingSize = parseFloat(servingSize) || 0;

  // Perform calculations
  const calculatedCalories = (parsedAmount / parsedServingSize) * parseFloat(calories) || 0;
  const calculatedCarbs = (parsedAmount / parsedServingSize) * parseFloat(carbs) || 0;
  const calculatedProtein = (parsedAmount / parsedServingSize) * parseFloat(protein) || 0;
  const calculatedFat = (parsedAmount / parsedServingSize) * parseFloat(fat) || 0;
  const calculatedFiber = (parsedAmount / parsedServingSize) * parseFloat(fiber) || 0;
  const calculatedSugar = (parsedAmount / parsedServingSize) * parseFloat(sugar) || 0;
  const calculatedSodium = (parsedAmount / parsedServingSize) * parseFloat(sodium) || 0;

  const data = {
    userId,
    dayId, 
    mealName: mealName.trim(),
    calories: parseFloat(calories) || 0,
    carbs: parseFloat(carbs) || 0,
    protein: parseFloat(protein) || 0,
    fat: parseFloat(fat) || 0,
    fiber: parseFloat(fiber) || 0,
    sugar: parseFloat(sugar) || 0,
    sodium: parseFloat(sodium) || 0,
    units,
    amount: parseFloat(amount) || 0,
    servingSize: parseFloat(servingSize) || 0,
    date: new Date(),
    CalcCalories: parseFloat(calculatedCalories) || 0,
    CalcCarbs: parseFloat(calculatedCarbs) || 0,
    CalcProtein: parseFloat(calculatedProtein) || 0,
    CalcFat: parseFloat(calculatedFat) || 0,
    CalcFiber: parseFloat(calculatedFiber) || 0,
    CalcSugar: parseFloat(calculatedSugar) || 0,
    CalcSodium: parseFloat(calculatedSodium) || 0,
  };

  console.log("Data to submit:", data);

  try {
    const response = await fetch(`/api/entries/${dayId}/createFoodEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Capture the error response
      console.error("Error from API:", errorData.error);
      throw new Error("Failed to save food entry");
    }

    const result = await response.json();
    console.log("Saved food entry:", result);
    
    // Clear form after successful submission
    setmealName("");
    setCalories("");
    setCarbs("");
    setProtein("");
    setFat("");
    setFiber("");
    setSugar("");
    setSodium("");
    setUnits("grams");
    setAmount("");
    setServingSize("");

    window.location.href = `/entries/${dayId}/dayView`;

  } catch (error) {
    console.error("Error:", error);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div><Link href={`/entries/${dayId}/dayView`}><i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-yellow"></i></Link>

    <div className="relative bg-gradient-to-b from-achieve-white via-achieve-yellow justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <div className="w-full max-w-lg mt-5">
        <div className="flex items-center w-full">
          <input
            type="text"
            value={mealName}
            onChange={(e) => setmealName(e.target.value)} 
            className="bg-achieve-grey text-xl font-semibold text-achieve-white outline-none p-2 mb-1 rounded w-full"
            placeholder="Food Name"
          />
          <i className="fa-solid fa-camera text-2xl cursor-pointer hover:text-achieve-green ml-4"></i>
        </div>
        <p className="text-sm text-gray-500 mt-1">*Per serving</p> 
      </div>

      {/* Card for Nutritional Information */}
      <div className="bg-achieve-grey rounded-lg shadow-lg text-achieve-white mt-5 p-10 w-full max-w-xl md:max-w-2xl">
        {[
          {label: "Calories per serving", color: "border-achieve-red", state: calories, setState: setCalories},
          { label: "Carbs", color: "border-achieve-pink", state: carbs, setState: setCarbs },
          { label: "Protein", color: "border-achieve-yellow", state: protein, setState: setProtein },
          { label: "Fat", color: "border-achieve-orange", state: fat, setState: setFat },
          { label: "Fiber", color: "border-achieve-bluepurple", state: fiber, setState: setFiber },
          { label: "Sugar", color: "border-achieve-seagreen", state: sugar, setState: setSugar },
          { label: "Sodium", color: "border-achieve-purple", state: sodium, setState: setSodium, unit: "mg" },
        ].map((nutrient) => (
          <div key={nutrient.label} className="mb-4 w-full">
            <h3 className="text-lg font-thin">{nutrient.label}</h3>
            <input
              type="text"
              placeholder={`0 ${nutrient.unit || "g"}`}              value={nutrient.state}
              onChange={(e) => nutrient.setState(e.target.value)}
              className={`bg-transparent border ${nutrient.color} rounded-md p-2 outline-none w-full`}
            />
          </div>
        ))}

        <div className="mb-4 w-full">
          <h3 className="text-lg font-thin">Serving Size Unit</h3>
          <select className="bg-achieve-grey border border-achieve-white rounded-md p-2 w-full"
              value={units}
              onChange={(e) => setUnits(e.target.value)}>
            <option value="grams">g</option>
            <option value="milligrams">mg</option>
            <option value="ounces">oz</option>
            <option value="cups">cups</option>
            <option value="cups">each</option>
          </select>
        </div>

        <div className="mb-4 w-full">
          <h3 className="text-lg font-thin">Amount Consumed</h3>
          <input
            type="text"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent border border-achieve-white rounded-md p-2 outline-none w-full"
          />
        </div>

        <div className="mb-4 w-full">
          <h3 className="text-lg font-thin">Serving Size</h3>
          <input
            type="text"
            placeholder="e.g., 1 cup"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            className="bg-transparent border border-achieve-white rounded-md p-2 outline-none w-full"
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">*As soon as you hit save, calculations will be done</p>

      <button 
        className="mt-8 text-lg font-semibold bg-achieve-grey text-achieve-white rounded-lg p-4 px-8 hover:bg-achieve-yellow"
        onClick={handleSubmit} 
      >
        {loading ? "Saving..." : "Save"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
    </div>
  );
}
