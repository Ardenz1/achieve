import { getAllEntriesByUser, getEntryById } from "../../../database/database"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const dayEntryId = searchParams.get('dayEntryId'); 
  
  
  // Check if both userId and dayEntryId are not provided
  if (!userId && !dayEntryId) {
    return new Response(JSON.stringify({ error: 'User ID or Day Entry ID is required' }), { status: 400 });
  }

  try {
    // If dayEntryId is provided, fetch the specific entry
    if (dayEntryId) {
      const entry = await getEntryById(dayEntryId); // Fetch the entry from the database
      if (!entry) {
        return new Response(JSON.stringify({ error: 'Entry not found' }), { status: 404 });
      }

      // Log the fetched entry for debugging
      console.log('Fetched entry:', entry);
      return new Response(JSON.stringify(entry), { status: 200 });
    }

    // Fetch all entries for the user if no specific ID is provided
    const entries = await getAllEntriesByUser(userId);
    return new Response(JSON.stringify(entries), { status: 200 });

  } catch (error) {
    console.error('Error fetching entries:', error); // Log the error for debugging
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 }
    );
  }
}

// import { getAllEntriesByUser } from "../../../database/database"; 

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get('userId');
  
//   console.log('Received userId:', userId);  // Log the userId to check it


//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
//   }

//   try {
//     const entries = await getAllEntriesByUser(userId);
//     console.log('Entries fetched:', entries); 


//     return new Response(JSON.stringify(entries), { status: 200 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'Something went wrong' }),
//       { status: 500 }
//     );
//   }
// }

