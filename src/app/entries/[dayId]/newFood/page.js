'use client';
import { useEffect, useState } from "react";

export default function NewFoodEntry() {
//   const [userId, setUserId] = useState(null);
//   const [foodTitle, setFoodTitle] = useState(""); 
//   const [carbs, setCarbs] = useState("");
//   const [protein, setProtein] = useState("");
//   const [fat, setFat] = useState("");
//   const [fiber, setFiber] = useState("");
//   const [sugar, setSugar] = useState("");
//   const [sodium, setSodium] = useState("");
//   const [units, setUnits] = useState("grams");
//   const [amount, setAmount] = useState("");
//   const [servingSize, setServingSize] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch user data to get userId
//   useEffect(() => {
//       const fetchUserData = async () => {
//           const token = localStorage.getItem("token");

//           if (!token) {
//               console.warn("No token found.");
//               return; // Exit early if no token
//           }

//           try {
//               const response = await fetch("/api/profile", {
//                   method: "GET",
//                   headers: {
//                       Authorization: `Bearer ${token}`,
//                   },
//               });

//               const data = await response.json();

//               if (!response.ok) {
//                   console.error("Error from API:", data.error);
//               } else {
//                   console.log("User data:", data);  // Log the user data
//                   setUserId(data.user.id); // Set the userId from the response
//                   console.log("User ID:", data.user.id);
//               }
//           } catch (error) {
//               console.error("Fetch Error:", error);
//           }
//       };

//       fetchUserData();
//   }, []);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     const dayId = 'cm76s2bn00000vbs8ll7h5oce';

//     // Calculate the nutritional values based on the input
//     const calculatedCarbs = (parseFloat(carbs) || 0) * 4; // 4 calories per gram of carbs
//     const calculatedProtein = (parseFloat(protein) || 0) * 4; // 4 calories per gram of protein
//     const calculatedFat = (parseFloat(fat) || 0) * 9; // 9 calories per gram of fat
//     const calculatedFiber = (parseFloat(fiber) || 0) * 2; // Optional: 2 calories per gram of fiber
//     const calculatedSugar = (parseFloat(sugar) || 0) * 4; // 4 calories per gram of sugar (if treated separately)

//     // Total calculated calories
//     const calculatedCalories = calculatedCarbs + calculatedProtein + calculatedFat + calculatedFiber + calculatedSugar;

//     const data = {
//         userId,
//         dayId,
//         foodTitle,
//         carbs: parseFloat(carbs) || 0,
//         protein: parseFloat(protein) || 0,
//         fat: parseFloat(fat) || 0,
//         fiber: parseFloat(fiber) || 0,
//         sugar: parseFloat(sugar) || 0,
//         sodium: parseFloat(sodium) || 0,
//         units,
//         amount: parseFloat(amount) || 0,
//         servingSize,
//         date: new Date(),
//         // Include calculated values
//         CalcCalories: calculatedCalories, // Total calculated calories
//         CalcCarbs: calculatedCarbs,
//         CalcProtein: calculatedProtein,
//         CalcFat: calculatedFat,
//         CalcFiber: calculatedFiber,
//         CalcSugar: calculatedSugar,
//         CalcSodium: parseFloat(sodium) || 0, // Sodium doesn't contribute calories
//     };

//     console.log("Data to submit:", data);

//     try {
//         const response = await fetch('/api/entries/createFoodEntry', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to save food entry");
//         }

//         const result = await response.json();
//         console.log("Saved food entry:", result);

//         // Clear form after successful submission
//         setFoodTitle("");
//         setCarbs("");
//         setProtein("");
//         setFat("");
//         setFiber("");
//         setSugar("");
//         setSodium("");
//         setUnits("grams");
//         setAmount("");
//         setServingSize("");

//     } catch (error) {
//         console.error("Error:", error);
//         setError("Something went wrong. Please try again.");
//     } finally {
//         setLoading(false);
//     }
// };

  return (
      <div className="relative bg-gradient-to-b from-achieve-white via-achieve-yellow justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
          <div className="w-full max-w-lg mt-5">
              <div className="flex items-center w-full">
                  <input
                      type="text"
                      value={foodTitle}
                      onChange={(e) => setFoodTitle(e.target.value)} 
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
                  <h3 className="text-lg font-thin">Units</h3>
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
                  <h3 className="text-lg font-thin">Amount</h3>
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
  );
}
