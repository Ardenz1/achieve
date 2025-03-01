import prisma from "@/database/client";

export async function GET(request, { params }) {
  const { id } = await params; // Extract the dayId from the params
  console.log("Received request for food entries with ID:", id); // Log the ID

  try {
    const foodEntries = await prisma.foodEntry.findMany({
      where: { dayId: id },
      select: {
        id: true,
        mealName: true,
        CalcCalories: true,
      },
    });

    console.log("Retrieved food entries:", foodEntries); // Log the retrieved entries

    if (!foodEntries.length) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(foodEntries), { status: 200 });
  } catch (error) {
    console.error("Error fetching food entries:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
