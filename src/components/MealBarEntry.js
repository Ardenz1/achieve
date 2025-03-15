import Link from 'next/link';

const MealBarEntry = ({ name, calories, foodId, dayId }) => {
  return (
    <div className="bg-achieve-grey w-full p-4 rounded-md text-white flex justify-between items-center">
      <span className="font-semibold">{name}</span>
      {calories ? (
        <span className="text-gray-200">{calories.toFixed(1) || 0} cal</span>
      ) : null}
      
      {/* Use the meal id to link to the detail page */}
      <Link href={`/entries/${dayId}/${foodId}/viewFood`}>
          <i className="fa-solid fa-pencil hover:text-achieve-green"></i>
      </Link>
    </div>
  );
};

export default MealBarEntry;
