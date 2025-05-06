import bcrypt from 'bcryptjs';
import prisma from '@/database/client'; // Correct import path for prisma

// Handle POST requests
export async function POST(req) {
  const { email, password } = await req.json(); 

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Email is already in use.' }), {
      status: 400,
    });
  }


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the response using Response object
    return new Response(
      JSON.stringify({ message: 'User created successfully!', user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error creating user.' }),
      { status: 500 }
    );
  }
}
