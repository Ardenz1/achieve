import Link from 'next/link';

const EntryCard = ({ entry }) => {
  const hasWeight = entry.weight !== undefined && entry.weight !== null;
  const hasCalories = entry.totalCalories !== undefined && entry.totalCalories !== null && entry.totalCalories !== 0;
  const hasData = hasWeight || hasCalories;

  return (
    <Link href={`/entries/${entry.id}/dayView`} passHref>
      <div className="flex flex-col items-center cursor-pointer">
        <div className="relative w-full h-64 rounded-md bg-achieve-grey border-2 border-achieve-seagreen bg-opacity-70 text-white p-4 transition-transform duration-200 hover:scale-105">
          <h1 className="bg-achieve-seagreen rounded-md p-2 absolute top-3 left-3 text-lg font-bold">
            {new Date(entry.date).toLocaleDateString()}
          </h1>
          <div className="flex flex-col h-full justify-center items-center">
            
            {/* Conditional content */}
            {hasData ? (
              <div className="w-full flex flex-col sm:flex-row justify-around px-8 gap-4 sm:gap-0 text-center">
                {hasWeight && (
                  <div>
                    <p className="text-3xl">{entry.weight}</p>
                    <p className="text-xl">Weight</p>
                  </div>
                )}
                {hasCalories && (
                  <div>
                    <p className="text-3xl">{entry.totalCalories}</p>
                    <p className="text-xl">Calories</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-lg font-semibold text-gray-300">Add Information to get started!</p>
            )}

          </div>
        </div>
      </div>
    </Link>
  );
};

export default EntryCard;
