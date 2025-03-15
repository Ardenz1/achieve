const SummaryCardHome = ({ carbs, protein, fat, fiber, sugar, sodium }) => {
  return (
    <div className="bg-achieve-grey mt-20 lg:h-96 lg:mt-0 p-16 rounded-xl w-full max-w-2xl shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 align-start">
        {[
          { label: "Carbs", value: carbs, color: "achieve-pink" },
          { label: "Protein", value: protein, color: "achieve-yellow" },
          { label: "Fat", value: fat, color: "achieve-orange" },
          { label: "Fiber", value: fiber, color: "achieve-bluepurple" },
          { label: "Sugar", value: sugar, color: "achieve-seagreen" },
          { label: "Sodium", value: sodium, color: "achieve-purple", unit: "mg" }
        ].map(({ label, value, color, unit = "g" }) => (
          <div key={label} className={`text-${color} flex flex-col items-center`}>
            <span className={`bg-${color} block h-3 w-20 rounded mb-2`}></span>
            <p className="text-xl font-semibold">{value.toFixed(1)}{unit}</p>
            <h3 className="text-lg font-medium">{label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCardHome;
