const SummaryCard = ({ calories, carbs, protein, fat, fiber, sugar, sodium }) => {
    return (
        <div className="bg-achieve-grey mt-20 p-12 md:p-20 rounded-lg w-full max-w-2xl shadow-lg">
            <div className="text-achieve-green space-y-2">
                <h2 className="text-lg font-semibold">Calories</h2>
                <span className="bg-achieve-green block h-2 w-full rounded"></span>
                <p className="text-lg font-medium">{calories}g</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6 align-start">
                <div className="text-achieve-pink text-left">
                    <span className="bg-achieve-pink block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{carbs}g</p>
                    <h3 className="text-lg font-thin">Carbs</h3>
                </div>
                <div className="text-achieve-yellow text-left">
                    <span className="bg-achieve-yellow block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{protein}g</p>
                    <h3 className="text-lg font-thin">Protein</h3>
                </div>
                <div className="text-achieve-orange text-left">
                    <span className="bg-achieve-orange block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{fat}g</p>
                    <h3 className="text-lg font-thin">Fat</h3>
                </div>
                <div className="text-achieve-bluepurple text-left">
                    <span className="bg-achieve-bluepurple block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{fiber}g</p>
                    <h3 className="text-lg font-thin">Fiber</h3>
                </div>
                <div className="text-achieve-seagreen text-left">
                    <span className="bg-achieve-seagreen block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{sugar}g</p>
                    <h3 className="text-lg font-thin">Sugar</h3>
                </div>
                <div className="text-achieve-purple text-left">
                    <span className="bg-achieve-purple block h-2 w-20 mx-auto rounded"></span>
                    <p className="text-sm font-medium">{sodium}g</p>
                    <h3 className="text-lg font-thin">Sodium</h3>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
