import { useState, useEffect } from "react";

const CaloriesHomeCard = ({ totalCalories, calorieGoal = 2000, today }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setDate(date.toLocaleDateString());
  }, []);

  const percentage = (totalCalories / calorieGoal) * 100;

  // Calculate the circumference of the circle with the original radius
  const radius = 90; // radius of the circle (same as before)
  const circumference = 2 * Math.PI * radius; // circumference of the circle

  // If totalCalories exceed the goal, set strokeDashoffset to 0 for a full circle
  const strokeDashoffset = totalCalories > calorieGoal ? 0 : circumference - (percentage / 100) * circumference;

  // Adjust this value to change the starting point of the progress (in degrees)
  const startAngle = -90; // This rotates the circle to start from the top (12 o'clock)

  return (
    <div className="bg-achieve-white p-8 lg:h-96 rounded-xl shadow-md w-full text-center max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Today at a Glance</h1>
      <p className="text-achieve-grey mb-10">Date: {date}</p>

      {totalCalories === 0 ? (
        <p className="text-achieve-red font-semibold">Create an entry to get started!</p>
      ) : (
        <div className="flex flex-col lg:flex-row items-center space-y-4 mb-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative w-24 h-24 lg:w-48 lg:h-48 flex-shrink-0 overflow-hidden">
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 200 200" // Set a viewBox to ensure scaling
              style={{ transform: `rotate(${startAngle}deg)` }}
            >
              {/* Outer circle (unchanged size) */}
              <circle cx="100" cy="100" r={radius} stroke="#e2e8f0" strokeWidth="10" fill="none" />
              {/* Inner circle with dynamic strokeDashoffset */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#ADEAA7"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-center break-words sm:whitespace-nowrap">
            {totalCalories.toFixed(1)} <br className="sm:hidden" /> / {calorieGoal} cal
          </p>
        </div>
      )}
    </div>
  );
};

export default CaloriesHomeCard;




// import { useState, useEffect } from "react";

// const CaloriesHomeCard = ({ totalCalories, calorieGoal = 2000, today }) => {
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     const date = new Date();
//     setDate(date.toLocaleDateString());
//   }, []);

//   const percentage = (totalCalories / calorieGoal) * 100;

//   return (
// <div className="bg-achieve-white p-8 lg:h-96 rounded-xl shadow-md w-full text-center max-w-lg">
//   <h1 className="text-2xl font-bold mb-2">Today at a Glance</h1>
//   <p className="text-achieve-grey mb-10">Date: {date}</p>

//   {totalCalories === 0 ? (
//     <p className="text-achieve-red font-semibold">Create an entry to get started!</p>
//   ) : (
//     <div className="flex flex-col lg:flex-row items-center space-y-4 mb-4 sm:flex-row sm:space-x-4 sm:space-y-0">
//       <div className="relative h-24 w-24 lg:h-48 lg:w-48 flex-shrink-0">
//         <svg className="absolute w-full h-full">
//           <circle cx="50%" cy="50%" r="45%" stroke="#e2e8f0" strokeWidth="10" fill="none" />
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             stroke="#ADEAA7"
//             strokeWidth="10"
//             fill="none"
//             strokeDasharray="283"
//             strokeDashoffset={283 - (283 * percentage) / 100}
//             strokeLinecap="round"
//             className="transition-all duration-500"
//           />
//         </svg>
//       </div>
//       <p className="text-xl font-semibold text-center break-words sm:whitespace-nowrap">
//         {totalCalories.toFixed(1)} <br className="sm:hidden" /> / {calorieGoal} cal
//       </p>
//     </div>
//   )}
// </div>

//   );
// };

// export default CaloriesHomeCard;
