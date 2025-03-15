import prisma from "@/database/client";

export async function DELETE(req, { params }) {
    const { id, foodId } = await params;
    console.log("id's in API!", id, foodId);
  
    try {
      // Check if the food entry exists
      const foodEntry = await prisma.foodEntry.findUnique({
        where: { id: foodId },
        include: {
          dayEntry: true, // assuming foodEntry has a relation to DayEntry
        },
      });
  
      if (!foodEntry) {
        return new Response(JSON.stringify({ error: 'Food entry not found' }), { status: 404 });
      }
  
      // Ensure the food entry is associated with the correct dayId
      if (foodEntry.dayEntry.id !== id) {
        return new Response(JSON.stringify({ error: 'Food entry does not belong to the specified day' }), { status: 400 });
      }
  
      // Delete the food entry
      await prisma.foodEntry.delete({
        where: { id: foodId },
      });
  
      // Return success response
      return new Response(JSON.stringify({ message: 'Food entry deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting food entry:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
  }
  