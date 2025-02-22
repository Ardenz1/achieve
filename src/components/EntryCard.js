const EntryCard = ({ entry }) => {
  return (
    <div className="flex flex-col items-center">
      
      <div className="relative w-96 h-64 rounded-md bg-achieve-grey border-2 border-achieve-seagreen bg-opacity-70 text-white p-4">
        <h1 className="bg-achieve-seagreen rounded-md p-2 absolute top-3 left-3 text-lg font-bold"> {new Date(entry.date).toLocaleDateString()}</h1>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full flex justify-around px-8 ">
            <div>
              <p className="text-3xl">{entry.weight}</p>
              <p className="text-xl">Weight</p>
            </div>
            <div>
              <p className="text-3xl">{entry.totalCalories}</p>
              <p className="text-xl">Calories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;

  