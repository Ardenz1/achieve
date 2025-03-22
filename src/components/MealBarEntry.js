import Link from 'next/link';

const MealBarEntry = ({ name, calories, foodId, dayId }) => {
  return (
    <div className="bg-achieve-bluepurple w-full p-4 rounded-md text-achieve-grey flex justify-between items-center">
      <span className="font-semibold">{name}</span>
      {calories ? (
        <span className="text-achieve-grey">{calories.toFixed(1) || 0} cal</span>
      ) : null}
      
      {/* Use the meal id to link to the detail page */}
      <Link href={`/entries/${dayId}/${foodId}/viewFood`}>
          <i className="fa-solid fa-pencil hover:text-achieve-darkorange"></i>
      </Link>
    </div>
  );
};

export default MealBarEntry;
