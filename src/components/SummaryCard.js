const SummaryCard = ({ calories, carbs, protein, fat, fiber, sugar, sodium }) => {
  return (
    <div className="bg-achieve-grey mt-20 lg:mt-0 p-16 rounded-xl w-full max-w-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-achieve-white mb-10">
        Nutritional Breakdown
      </h1>

      {/* Calories on top */}
      <div className="text-achieve-green flex flex-col items-center mb-6">
        <div>
        <span className="bg-achieve-green block h-3 w-40 lg:w-96 rounded mb-2"></span>
        <p className="text-xl font-semibold self-start">{calories?.toFixed(1) || 0}</p>
        <h3 className="text-lg font-medium self-start pb-5">Calories</h3>
        </div>
      </div>

      {/* Other categories in a 3x3 grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 align-start">
        
        {/* Carbs */}
        <div className="flex flex-col items-center text-achieve-pink">
          <span className="bg-achieve-pink block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{carbs?.toFixed(1) || 0}g</p>
          <h3 className="text-lg font-medium">Carbs</h3>
        </div>

        {/* Protein */}
        <div className="flex flex-col items-center text-achieve-yellow">
          <span className="bg-achieve-yellow block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{protein?.toFixed(1) || 0}g</p>
          <h3 className="text-lg font-medium">Protein</h3>
        </div>

        {/* Fat */}
        <div className="flex flex-col items-center text-achieve-orange">
          <span className="bg-achieve-orange block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{fat?.toFixed(1) || 0}g</p>
          <h3 className="text-lg font-medium">Fat</h3>
        </div>

        {/* Fiber */}
        <div className="flex flex-col items-center text-achieve-bluepurple">
          <span className="bg-achieve-bluepurple block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{fiber?.toFixed(1) || 0}g</p>
          <h3 className="text-lg font-medium">Fiber</h3>
        </div>

        {/* Sugar */}
        <div className="flex flex-col items-center text-achieve-seagreen">
          <span className="bg-achieve-seagreen block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{sugar?.toFixed(1) || 0}g</p>
          <h3 className="text-lg font-medium">Sugar</h3>
        </div>

        {/* Sodium */}
        <div className="flex flex-col items-center text-achieve-purple">
          <span className="bg-achieve-purple block h-3 w-20 rounded mb-2"></span>
          <p className="text-xl font-semibold">{sodium?.toFixed(1) || 0}mg</p>
          <h3 className="text-lg font-medium">Sodium</h3>
        </div>

      </div>
    </div>
  );
};

export default SummaryCard;
