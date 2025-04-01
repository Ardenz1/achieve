import { NextResponse } from "next/server";
import prisma from "@/database/client";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token, date } = await req.json(); // Extract token and selected date
    console.log("Received Date in API:", date); // ✅ Log received date from frontend

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.userId;
    console.log("Decoded User ID:", userId);


    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const selectedDate = new Date(date + "T00:00:00.000Z"); // Fix UTC shift
    console.log("Fixed Date (UTC):", selectedDate.toISOString());

    console.log("Formatted Selected Date:", selectedDate); 

    // Check if a day entry already exists for the selected date
    const existingEntry = await prisma.dayEntry.findFirst({
      where: {
        userId,
        date: selectedDate,
      },
    });

    if (existingEntry) {
      return NextResponse.json({ error: "An entry already exists for that day, please choose a new date." }, { status: 400 });
    }

    // Create a new day entry with the selected date
    const newDayEntry = await prisma.dayEntry.create({
      data: {
        userId,
        date: selectedDate,
      },
    });

    console.log("Created DayEntry:", newDayEntry); // ✅ Log what Prisma returns

    return NextResponse.json({ 
      dayEntryId: newDayEntry.id, 
      date: newDayEntry.date  // ✅ Ensure date is included in the response
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating DayEntry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import prisma from "@/database/client";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const { token } = await req.json(); // Extract token from request body

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Verify and decode the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded?.userId;

//     if (!userId) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     // Check if a day entry already exists for today
//     const today = new Date();
//     const existingEntry = await prisma.dayEntry.findFirst({
//       where: {
//         userId,
//         date: {
//           gte: new Date(today.setHours(0, 0, 0, 0)), // Start of the day
//           lt: new Date(today.setHours(23, 59, 59, 999)), // End of the day
//         },
//       },
//     });

//     if (existingEntry) {
//       return NextResponse.json({ error: "A entry already exists for that day." }, { status: 400 });
//     }

//     // Create a new day entry
//     const newDayEntry = await prisma.dayEntry.create({
//       data: {
//         userId,
//         date: new Date(), // Default to today’s date
//       },
//     });

//     return NextResponse.json({ dayEntryId: newDayEntry.id }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating DayEntry:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }