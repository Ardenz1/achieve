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
      totalCalories: true,
   
    }
  });
  return days;
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