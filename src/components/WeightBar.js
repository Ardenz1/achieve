import { useState } from "react";

const WeightBar = ({ weight, onSave }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [newWeight, setNewWeight] = useState(weight || ""); // Store the new weight value

  const handleSave = () => {
    onSave(newWeight); // Trigger onSave function to save the weight
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="bg-achieve-bluepurple  w-full md:w-[40%] lg:w-[40%] p-4 mt-10 rounded-md text-white text-center items-center border-achieve-white">
    <h1 className="text-2xl text-achieve-grey font-bold mb-10">Weight</h1>

      <div className="flex justify-center mb-10">
        {isEditing ? (
          // If editing, show input and save button
          <>
            <input
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="text-achieve-grey text-center p-2 rounded-md"
              placeholder="Enter weight"
            />
            <button
              onClick={handleSave}
              className="mt-2 p-2 bg-achieve-green rounded-md ml-2 text-achieve-grey hover:bg-white"
            >
              Save
            </button>
          </>
        ) : (
          // If not editing and weight exists, show the weight with the pencil icon
          <>
            <span className="text-achieve-grey text-center">{weight ? `${weight} lbs` : "Add weight"}</span>
            <i
              className="fa-solid fa-pencil text-achieve-grey hover:text-achieve-green cursor-pointer ml-4"
              onClick={() => setIsEditing(true)} // Start editing when the pencil icon is clicked
            ></i>
          </>
        )}
      </div>
    </div>
  );
};

export default WeightBar;

