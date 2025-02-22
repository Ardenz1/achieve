const SummaryCard = () => {
    return (
        <div className="bg-achieve-grey mt-20 p-12 md:p-20 rounded-lg w-full max-w-2xl shadow-lg">
            <div className="text-achieve-green space-y-2">
                <h2 className="text-lg font-semibold">Calories</h2>
                <span className="bg-achieve-green block h-2 w-full rounded"></span>
                <p className="text-lg font-medium">1300g</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-6 align-start">
                {[
                    { label: "Carbs", color: "achieve-pink", value: "1300g" },
                    { label: "Protein", color: "achieve-yellow", value: "13g" },
                    { label: "Fat", color: "achieve-orange", value: "1300g" },
                    { label: "Fiber", color: "achieve-bluepurple", value: "1300g" },
                    { label: "Sugar", color: "achieve-seagreen", value: "1300g" },
                    { label: "Sodium", color: "achieve-purple", value: "1300g" },
                ].map((item) => (
                    <div key={item.label} className={`text-${item.color} text-left `}>
                    <span className={`bg-${item.color} block h-2 w-20 mx-auto rounded`}></span>
                    <p className="text-sm font-medium">{item.value}</p>
                    <h3 className="text-lg font-thin">{item.label}</h3>
                    </div>
            ))}
            </div>
        </div>
    );
  };
  
  export default SummaryCard;
  