// api/entries/[id]/edit/editWeight/route.js
import prisma from "@/database/client";

// Correctly access the params to get the dayEntryId
export async function PUT(request, { params }) {
  console.log("Params:", params);
  
  const { id } = params;  // Access the id directly from params
  console.log("ID from params:", id);

  const requestData = await request.json();
  console.log("Request body:", requestData);
  
  const { weight } = requestData;  // Extract weight from request body
  console.log("Weight extracted:", weight);

  try {
    // Ensure that the weight is a number and not a string
    const parsedWeight = parseFloat(weight);
    
    if (isNaN(parsedWeight)) {
      return new Response(JSON.stringify({ error: "Invalid weight value" }), { status: 400 });
    }

    // Update the day entry with the new weight (as a Float)
    const updatedEntry = await prisma.dayEntry.update({
      where: { id: id },  // Use the id from the URL parameters
      data: { weight: parsedWeight },  // Update the weight with the parsed Float value
    });

    console.log("Updated Entry:", updatedEntry);  // Log the updated entry

    return new Response(JSON.stringify({ message: "Weight updated successfully.", updatedEntry: updatedEntry }), { status: 200 });
  } catch (error) {
    console.error("Error updating weight:", error.message || error);
    return new Response(JSON.stringify({ error: "Failed to update weight." }), { status: 500 });
  }
}
