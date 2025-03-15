import prisma from "@/database/client";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date"); // Get the date from query parameters

  if (!date) {
    return new Response(JSON.stringify({ error: "Date parameter is required." }), { status: 400 });
  }

  try {
    const dayEntry = await prisma.dayEntry.findFirst({
      where: { date: new Date(date) }, // Compare date
      include: {
        foodEntries: true,
      },
    });

    if (!dayEntry) {
      return new Response(JSON.stringify({ error: "Day entry not found for the specified date." }), { status: 404 });
    }

    return new Response(JSON.stringify(dayEntry), { status: 200 });
  } catch (error) {
    console.error("Error fetching day entry by date:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), { status: 500 });
  }
}
