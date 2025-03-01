import prisma from "@/database/client";

export async function POST(req) {
  console.log("Received data:", req.body);
  try {
    const body = await req.json();
    console.log("Received data:", req.body);

    const {  userId,
      dayId,
      mealName,
      carbs,
      protein,
      fat,
      fiber,
      sugar,
      sodium,
      units,
      amount,
      servingSize,
      calories,
      savedAt, 
      CalcCalories,
      CalcCarbs,
      CalcProtein,
      CalcFat,
      CalcFiber,
      CalcSugar,
      CalcSodium
    } = body;

    if (!userId || !dayId || !mealName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const newFoodEntry = await prisma.foodEntry.create({
      data: {
        userId,
        dayId,
        mealName,
        calories,
        carbs,
        protein,
        fat,
        fiber,
        sugar,
        sodium,
        units,
        amount,
        servingSize,
        calories,
        savedAt,
        date: new Date(),
        CalcCalories,
        CalcCarbs,
        CalcProtein,
        CalcFat,
        CalcFiber,
        CalcSugar,
        CalcSodium
      },
    });

    return new Response(JSON.stringify(newFoodEntry), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
