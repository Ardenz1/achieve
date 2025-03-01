// entries/[id]/deleteFoodDay/route.js
import prisma from "@/database/client";

// Correctly access the params to get the dayEntryId
export async function DELETE(request, { params }) {
    const { id } = await params;  // Access the id directly from params
      
    try {
      // Ensure that id is not null or undefined
      if (!id) {
        return new Response(JSON.stringify({ error: "No ID provided" }), { status: 400 });
      }
  
      // Delete the day entry from the database
      const deletedEntry = await prisma.dayEntry.delete({
        where: { id: id },  // id is a string in your schema
      });
  
      return new Response(JSON.stringify({ message: "Entry deleted successfully.", deletedEntry }), { status: 200 });
    } catch (error) {
      console.error("Error deleting entry:", error);
      return new Response(JSON.stringify({ error: "Failed to delete entry." }), { status: 500 });
    }
  }
  