// // API route for creating a food entry
// import { getTokenFromHeaders, verifyToken } from '@/utils/auth';
// import prisma from '@/database/client'; // Ensure this path is correct

// export async function POST(req) {
//     try {
//         const data = await req.json();
//         console.log("Incoming data:", data);

//         const token = getTokenFromHeaders(req);
//         console.log("Token from request:", token);

//         if (!token) {
//             console.warn("No token found.");
//             return Response.json({ error: 'Unauthorized' }, { status: 401 });
//         }

//         const decoded = verifyToken(token);
//         if (!decoded) {
//             console.error("Invalid token");
//             return Response.json({ error: 'Invalid token' }, { status: 401 });
//         }

//         const userId = decoded.userId;
//         if (!userId) {
//             console.error("User ID not found in token");
//             return Response.json({ error: 'User ID not found in token' }, { status: 400 });
//         }

//         // Extract dayId and calculated nutritional values from the incoming data
//         const { dayId, carbs, protein, fat, fiber, sugar, sodium, amount, servingSize, units, 
//                 calculatedCalories, calculatedCarbs, calculatedProtein, 
//                 calculatedFat, calculatedFiber, calculatedSugar, calculatedSodium } = data;

//         if (!dayId) {
//             console.error("dayId is not provided in the request");
//             return Response.json({ error: 'dayId is required' }, { status: 400 });
//         }

//         console.log("Data to create food entry:", {
//             userId,
//             dayId,
//             carbs: parseFloat(carbs) || 0,
//             protein: parseFloat(protein) || 0,
//             fat: parseFloat(fat) || 0,
//             fiber: parseFloat(fiber) || 0,
//             sugar: parseFloat(sugar) || 0,
//             sodium: parseFloat(sodium) || 0,
//             units,
//             amount: parseFloat(amount) || 0,
//             servingSize: parseFloat(servingSize) || 0,
//             date: new Date(),
//             calculatedCalories: parseFloat(calculatedCalories) || 0,
//             calculatedCarbs: parseFloat(calculatedCarbs) || 0,
//             calculatedProtein: parseFloat(calculatedProtein) || 0,
//             calculatedFat: parseFloat(calculatedFat) || 0,
//             calculatedFiber: parseFloat(calculatedFiber) || 0,
//             calculatedSugar: parseFloat(calculatedSugar) || 0,
//             calculatedSodium: parseFloat(calculatedSodium) || 0,
//         });

//         // Create the food entry with both original and calculated values
//         const foodEntry = await prisma.foodEntry.create({
//             data: {
//                 userId,
//                 dayEntry: { connect: { id: dayId } },
//                 carbs: parseFloat(carbs) || 0,
//                 protein: parseFloat(protein) || 0,
//                 fat: parseFloat(fat) || 0,
//                 fiber: parseFloat(fiber) || 0,
//                 sugar: parseFloat(sugar) || 0,
//                 sodium: parseFloat(sodium) || 0,
//                 units,
//                 amount: parseFloat(amount) || 0,
//                 servingSize: parseFloat(servingSize) || 0,
//                 date: new Date(),
//                 // Save calculated values
//                 CalcCalories: parseFloat(calculatedCalories) || 0,
//                 CalcCarbs: parseFloat(calculatedCarbs) || 0,
//                 CalcProtein: parseFloat(calculatedProtein) || 0,
//                 CalcFat: parseFloat(calculatedFat) || 0,
//                 CalcFiber: parseFloat(calculatedFiber) || 0,
//                 CalcSugar: parseFloat(calculatedSugar) || 0,
//                 CalcSodium: parseFloat(calculatedSodium) || 0,
//             },
//         });

//         console.log("Food entry created:", foodEntry);

//         return Response.json(foodEntry);
//     } catch (error) {
//         console.error("Error during food entry creation:", error);

//         const errorMessage = error instanceof Error ? error.message : "Error during food entry creation";
//         return Response.json({ error: errorMessage }, { status: 500 });
//     }
// }
