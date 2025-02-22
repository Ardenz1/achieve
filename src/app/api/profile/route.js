import jwt from 'jsonwebtoken';
import prisma from '@/database/client'; 

export async function GET(req) {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded || !decoded.userId) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch the user from the database using userId from the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data (excluding the password for security)
    return Response.json({ user: { id: user.id, email: user.email } }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
