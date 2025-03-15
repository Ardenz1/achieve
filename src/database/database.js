import prisma from '@/database/client';

// Get all entries
export async function getAllEntriesByUser(userId) {
  console.log('Querying for userId:', userId); // Log the userId

  const days = await prisma.dayEntry.findMany({
    where: { userId: userId },
    orderBy: { date: "desc" },
    select: {
      id: true,
      date: true,
      weight: true,
      foodEntries: {
        select: {
          CalcCalories: true,
        },
      },
    },
  });

  // Calculate the total calories for each day by summing up CalcCalories for each food entry
  const daysWithTotalCalories = days.map(day => {
    const totalCalories = day.foodEntries.reduce((sum, foodEntry) => sum + foodEntry.CalcCalories, 0);
    return {
      ...day,
      totalCalories,
    };
  });

  return daysWithTotalCalories;
}


  // Get user by ID
  export async function getUserById(userId) {
      const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
              id: true,
              email: true,
              foodEntries: true,
          },
      });
      return user;
  }
  
  export async function saveFoodEntry(data) {
    return await prisma.foodEntry.create({
        data
    });
}
export async function getEntryById(dayEntryId) {
  console.log('Fetching entry with ID:', dayEntryId); // Log the ID being fetched

  return await prisma.dayEntry.findUnique({
    where: { id: dayEntryId },
  });
}

export async function updateFoodEntry(foodId, data) {
  console.log('Updating food entry with ID:', foodId); // Log the foodId
  try {
    const updatedFoodEntry = await prisma.foodEntry.update({
      where: { id: foodId }, // Specify the food entry to update by its ID
      data, // Apply the updated data
    });
    return updatedFoodEntry;
  } catch (error) {
    console.error('Error updating food entry:', error);
    throw new Error('Unable to update food entry');
  }
}