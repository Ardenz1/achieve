'use client';
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Link from 'next/link';
console.log("hello!!");

export default function ViewFoodEntry() {
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
  const [id, setDayid] = useState(null);
  const [foodId, setfoodId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const tokenSize = new TextEncoder().encode(token).length;
      console.log(`Size of JWT token: ${tokenSize} bytes`);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = path.match(/\/entries\/([^/]+)\/([^/]+)\/viewFood/);
  
      if (match && match[1] && match[2]) {
        const id = match[1];
        const foodId = match[2];
        setDayid(id);
        setfoodId(foodId);
        console.log("Extracted dayId:", id);
        console.log("Extracted foodId:", foodId);
  
        // Fetch the food entry
        fetchFoodEntry(id, foodId);
      }
    }
  }, []);
  
  const fetchFoodEntry = async (id, foodId) => {
    console.log("starting fetch for entries with", id, foodId);
    try {
      const response = await fetch(`/api/entries/${id}/${foodId}/get`, {
        method: 'GET',
       
      });

      const data = await response.json();
      console.log("Fetched food entry data:", data); 

      if (!response.ok) {
        console.error("Error fetching food entry:", data.error);
        return;
      }

      // Populate the form with the fetched data
      setmealName(data.mealName);
      setCalories(data.calories);
      setCarbs(data.carbs);
      setProtein(data.protein);
      setFat(data.fat);
      setFiber(data.fiber);
      setSugar(data.sugar);
      setSodium(data.sodium);
      setUnits(data.units);
      setAmount(data.amount);
      setServingSize(data.servingSize);
    } catch (error) {
      console.error("Error fetching food entry:", error);
    }
  };

  const handleUpdate = async (id, foodId) => {
    setLoading(true);
    setError(null);
  
    try {
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
  
      // Send update request
      const response = await fetch(`/api/entries/${id}/${foodId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parsedAmount,
          servingSize: parsedServingSize,
          calories: parseFloat(calories) || 0,
          carbs: parseFloat(carbs) || 0,
          fat: parseFloat(fat) || 0,
          fiber: parseFloat(fiber) || 0,
          mealName: mealName.trim(),
          protein: parseFloat(protein) || 0,
          sodium: parseFloat(sodium) || 0,
          sugar: parseFloat(sugar) || 0,
          units,
          CalcCalories: calculatedCalories,
          CalcCarbs: calculatedCarbs,
          CalcProtein: calculatedProtein,
          CalcFat: calculatedFat,
          CalcFiber: calculatedFiber,
          CalcSugar: calculatedSugar,
          CalcSodium: calculatedSodium,
        }),
      });
  
      const responseText = await response.text();
  
      if (!response.ok) {
        console.error("API Error:", responseText);
        setError("Failed to update food entry.");
        return;
      }
  
      try {
        const data = JSON.parse(responseText);
        console.log("Updated food entry:", data);
        window.location.href = `/entries/${id}/dayView`;
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.error("Raw response text:", responseText);
        setError("Unexpected response format.");
      }
  
    } catch (error) {
      console.error("Error in update request:", error);
      setError("Failed to update food entry.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const confirmDelete = () => {
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the modal without deleting
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/entries/${id}/${foodId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete entry.");
        return;
      }

      setSuccessMessage("Entry deleted successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = `/entries/${id}/dayView`; // Redirect after success
      }, 2000);
    } catch (error) {
      console.error("Error deleting entry:", error);
      setError("An unexpected error occurred while deleting.");
    }
  };

  

  return (
    <div><Link href={`/entries/${id}/dayView`}><i className="pl-10 pt-5 text-2xl fa-solid fa-arrow-left hover:text-achieve-yellow"></i></Link>
    <div className="relative bg-[url('/foodviewbg.png')] bg-cover bg-center justify-items-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
    <div className="w-full max-w-lg mt-5">
      <div className="flex items-center w-full">
        <input
          type="text"
          value={mealName}
          onChange={(e) => setmealName(e.target.value)} 
          className="bg-achieve-grey text-xl font-semibold text-achieve-white outline-none p-2 mb-1 rounded w-full"
          placeholder="Food Title goes here"
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
        { label: "Sodium", color: "border-achieve-purple", state: sodium, setState: setSodium },
      ].map((nutrient) => (
        <div key={nutrient.label} className="mb-4 w-full">
          <h3 className="text-lg font-thin">{nutrient.label}</h3>
          <input
            type="text"
            placeholder="0 g"
            value={nutrient.state}
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
  
    <p className="text-sm text-gray-500 ">*As soon as you hit save, calculations will be done</p>
    
    {/* Button and Trash Icon - Centered */}
    <div className="flex items-center justify-center gap-4 ">
      <button 
        className="text-lg font-semibold bg-achieve-grey text-achieve-white rounded-lg p-4 px-8 hover:bg-achieve-yellow"
        onClick={() => handleUpdate(id, foodId)}>
        {loading ? "Saving..." : "update"}
      </button>
      <button onClick={() => confirmDelete(id, foodId)}>
      <i className="text-red-500 text-3xl fa-solid fa-trash cursor-pointer hover:text-red-800"></i></button>
    </div>
    {successMessage && <p className="text-achieve-orange">{successMessage}</p>}
    {error && <p className="text-red-500 ">{error}</p>}

    <ConfirmDeleteModal
        show={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={cancelDelete}
      />
  </div>
  </div>
  );
}
