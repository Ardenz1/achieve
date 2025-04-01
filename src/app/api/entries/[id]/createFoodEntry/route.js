// import prisma from "@/database/client";

// export async function POST(req) {
//   console.log("Received data:", req.body);
//   try {
//     const body = await req.json();
//     console.log("Received data:", req.body);

//     const {  userId,
//       dayId,
//       mealName,
//       carbs,
//       protein,
//       fat,
//       fiber,
//       sugar,
//       sodium,
//       units,
//       amount,
//       servingSize,
//       calories,
//       savedAt, 
//       CalcCalories,
//       CalcCarbs,
//       CalcProtein,
//       CalcFat,
//       CalcFiber,
//       CalcSugar,
//       CalcSodium
//     } = body;

//     if (!userId || !dayId || !mealName) {
//       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
//     }

//     const newFoodEntry = await prisma.foodEntry.create({
//       data: {
//         userId,
//         dayId,
//         mealName,
//         calories,
//         carbs,
//         protein,
//         fat,
//         fiber,
//         sugar,
//         sodium,
//         units,
//         amount,
//         servingSize,
//         calories,
//         savedAt,
//         date: new Date(),
//         CalcCalories,
//         CalcCarbs,
//         CalcProtein,
//         CalcFat,
//         CalcFiber,
//         CalcSugar,
//         CalcSodium
//       },
//     });

//     return new Response(JSON.stringify(newFoodEntry), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


import prisma from "@/database/client";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received data:", body);

    const { 
      userId,
      dayId,
      mealName,
      carbs = null,
      protein = null,
      fat = null,
      fiber = null,
      sugar = null,
      sodium = null,
      units = null,
      amount = null,
      servingSize = null,
      calories = null,
      savedAt = null,
      CalcCalories = null,
      CalcCarbs = null,
      CalcProtein = null,
      CalcFat = null,
      CalcFiber = null,
      CalcSugar = null,
      CalcSodium = null
    } = body;

    if (!userId || !dayId || !mealName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Create an object with only defined values
    const foodEntryData = {
      userId,
      dayId,
      mealName,
      date: new Date(),
      ...(calories !== null && { calories }),
      ...(carbs !== null && { carbs }),
      ...(protein !== null && { protein }),
      ...(fat !== null && { fat }),
      ...(fiber !== null && { fiber }),
      ...(sugar !== null && { sugar }),
      ...(sodium !== null && { sodium }),
      ...(units !== null && { units }),
      ...(amount !== null && { amount }),
      ...(servingSize !== null && { servingSize }),
      ...(savedAt !== null && { savedAt }),
      ...(CalcCalories !== null && { CalcCalories }),
      ...(CalcCarbs !== null && { CalcCarbs }),
      ...(CalcProtein !== null && { CalcProtein }),
      ...(CalcFat !== null && { CalcFat }),
      ...(CalcFiber !== null && { CalcFiber }),
      ...(CalcSugar !== null && { CalcSugar }),
      ...(CalcSodium !== null && { CalcSodium })
    };

    const newFoodEntry = await prisma.foodEntry.create({
      data: foodEntryData,
    });

    return new Response(JSON.stringify(newFoodEntry), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
