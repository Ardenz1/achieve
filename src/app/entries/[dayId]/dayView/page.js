"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DetailPage() {
  // const { entryId } = useParams();
  // const [dayData, setDayData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`/api/entries/${entryId}`);
  //     const data = await res.json();
  //     setDayData(data);
  //   };
  //   fetchData();
  // }, [entryId]);

  return (
    <div>
      <h1>Daily Entry</h1>
      {dayData ? (
        <div>
          <p>Date: {new Date(dayData.date).toDateString()}</p>
          <h2>Foods:</h2>
          {dayData.foods.map((food) => (
            <div key={food.id}>
              <p>Carbs: {food.carbs}g</p>
              <p>Sodium: {food.sodium}mg</p>
              <p>Sugar: {food.sugar}g</p>
              <p>Calories: {food.calories}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
