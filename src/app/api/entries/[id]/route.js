import prisma from "@/database/client";

export async function GET(request, { params }) {
  const { id } = await params; // Extract the dayEntryId from the params

  try {
    const dayEntry = await prisma.dayEntry.findUnique({
      where: { id },
      select: {
        date: true,          // Select the date field
        weight: true,        // Include the weight field (add other fields as necessary)
        totalCalories: true, // Include the totalCalories field (add other fields as necessary)
        // Add other fields you want to return here
      },
    });

    if (!dayEntry) {
      return new Response(JSON.stringify({ error: "Day entry not found." }), { status: 404 });
    }

    return new Response(JSON.stringify(dayEntry), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
