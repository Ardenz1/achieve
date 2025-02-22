// API route for updating email
import prisma from '@/database/client';
import { getTokenFromHeaders, verifyToken } from '@/utils/auth';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Get token from headers
    const token = getTokenFromHeaders(req);
    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Update the user's email
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { email },
    });

    return Response.json({ message: 'Email updated successfully', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
