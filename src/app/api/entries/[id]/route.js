import prisma from "@/database/client";

export async function GET(request, { params }) {
    const { id } = params; // Extract the dayEntryId from the params
  
    try {
      const dayEntry = await prisma.dayEntry.findUnique({
        where: { id },
        select: { date: true }, // Only select the date field
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