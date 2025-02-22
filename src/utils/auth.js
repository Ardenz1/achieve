import jwt from 'jsonwebtoken';

export function getTokenFromHeaders(req) {
  const authHeader = req.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
}

export function verifyToken(token) {
  console.log("Token to verify:", token); // Log the token
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
