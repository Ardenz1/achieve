const SummaryCard = ({ calories, carbs, protein, fat, fiber, sugar, sodium }) => {
    return (
        <div className="bg-achieve-grey mt-20 p-12 md:p-20 rounded-lg w-full max-w-2xl shadow-lg border">
            <h1 className="text-2xl font-bold text-center text-achieve-white mb-10">Summary of your day</h1>
            <div className="text-achieve-green space-y-2 mb-16">
                <span className="bg-achieve-green block h-2 w-full rounded"></span>
                <p className="text-lg font-medium">{calories?.toFixed(1) || 0}</p>
                <h2 className="text-lg font-semibold">Calories</h2>

            </div>
            <div className="grid grid-cols-3 gap-6 mt-6 align-start">
                <div className="text-achieve-pink text-left">
                    <span className="bg-achieve-pink block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{carbs?.toFixed(1) || 0} g</p>
                    <h3 className="text-lg font-thin">Carbs</h3>
                </div>
                <div className="text-achieve-yellow text-left">
                    <span className="bg-achieve-yellow block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{protein?.toFixed(1) || 0}g</p>
                    <h3 className="text-lg font-thin">Protein</h3>
                </div>
                <div className="text-achieve-orange text-left">
                    <span className="bg-achieve-orange block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{fat?.toFixed(1) || 0}g</p>
                    <h3 className="text-lg font-thin">Fat</h3>
                </div>
                <div className="text-achieve-bluepurple text-left">
                    <span className="bg-achieve-bluepurple block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{fiber?.toFixed(1) || 0}g</p>
                    <h3 className="text-lg font-thin">Fiber</h3>
                </div>
                <div className="text-achieve-seagreen text-left">
                    <span className="bg-achieve-seagreen block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{sugar?.toFixed(1) || 0}g</p>
                    <h3 className="text-lg font-thin">Sugar</h3>
                </div>
                <div className="text-achieve-purple text-left">
                    <span className="bg-achieve-purple block h-2 w-30 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{sodium?.toFixed(1) || 0}mg</p>
                    <h3 className="text-lg font-thin">Sodium</h3>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
