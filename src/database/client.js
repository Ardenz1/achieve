import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

export default prisma

// async function updateDayEntryTotals(dayId: string) {
//     const foodEntries = await prisma.foodEntry.findMany({
//       where: { dayId },
//     });
  
//     // Calculate the totals
//     const totals = foodEntries.reduce(
//       (acc, entry) => {
//         acc.totalCalories += entry.calories ?? 0;
//         acc.totalCarbs += entry.carbs ?? 0;
//         acc.totalProtein += entry.protein ?? 0;
//         acc.totalFat += entry.fat ?? 0;
//         acc.totalFiber += entry.fiber ?? 0;
//         acc.totalSugar += entry.sugar ?? 0;
//         acc.totalSodium += entry.sodium ?? 0;
//         return acc;
//       },
//       {
//         totalCalories: 0,
//         totalCarbs: 0,
//         totalProtein: 0,
//         totalFat: 0,
//         totalFiber: 0,
//         totalSugar: 0,
//         totalSodium: 0,
//       }
//     );
  
//     // Update the corresponding DayEntry
//     await prisma.dayEntry.update({
//       where: { id: dayId },
//       data: totals,
//     });
//   }