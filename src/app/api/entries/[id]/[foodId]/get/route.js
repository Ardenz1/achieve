// GET
import prisma from "@/database/client";

export async function GET(request, { params }) {
  const { id, foodId } = await params; // Extract both dayId and foodId from params
  try {
    const foodEntry = await prisma.foodEntry.findUnique({
      where: {
        id: id,
        id: foodId, // Match both dayId and foodId
      },
      select: {
        id: true,
        mealName: true,
        calories: true,
        carbs:true, 
        protein:true,
        fat:true,
        fiber:true,
        sugar:true,
        sodium:true, 
        servingSize: true,
        amount:true,
        units:true,
      },
    });

    if (!foodEntry) {
      return new Response(JSON.stringify({ error: "Food entry not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(foodEntry), { status: 200 });
  } catch (error) {
    // console.error("Error fetching food entry:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
