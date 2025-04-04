import prisma from "@/database/client";

export async function PUT(request, { params }) {
  const { id, foodId } = params;
  console.log("Received id:", id);
  console.log("Received foodId:", foodId);

  try {
    const data = await request.json();
    console.log("Data received in PUT request:", data);

    const foodEntry = await prisma.foodEntry.findUnique({
      where: { id: foodId },
    });

    if (!foodEntry) {
      return new Response(
        JSON.stringify({ error: "Food entry not found" }),
        { status: 404 }
      );
    }

    const updatedFoodEntry = await prisma.foodEntry.update({
      where: { id: foodId },
      data: {
        amount: parseFloat(data.amount),
        calories: data.calories ? parseFloat(data.calories) : null,
        carbs: data.carbs ? parseFloat(data.carbs) : null,
        fat: data.fat ? parseFloat(data.fat) : null,
        fiber: data.fiber ? parseFloat(data.fiber) : null,
        mealName: data.mealName,
        protein: data.protein ? parseFloat(data.protein) : null,
        servingSize: data.servingSize ? parseFloat(data.servingSize) : null,
        sodium: data.sodium ? parseFloat(data.sodium) : null,
        sugar: data.sugar ? parseFloat(data.sugar) : null,
        units: data.units,

        // Calculated fields
        CalcCalories: data.CalcCalories ? parseFloat(data.CalcCalories) : null,
        CalcCarbs: data.CalcCarbs ? parseFloat(data.CalcCarbs) : null,
        CalcProtein: data.CalcProtein ? parseFloat(data.CalcProtein) : null,
        CalcFat: data.CalcFat ? parseFloat(data.CalcFat) : null,
        CalcFiber: data.CalcFiber ? parseFloat(data.CalcFiber) : null,
        CalcSugar: data.CalcSugar ? parseFloat(data.CalcSugar) : null,
        CalcSodium: data.CalcSodium ? parseFloat(data.CalcSodium) : null,
      },
    });

    return new Response(JSON.stringify(updatedFoodEntry), { status: 200 });
  } catch (error) {
    console.error("Error updating food entry:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}
