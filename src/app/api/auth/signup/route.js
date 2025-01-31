import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Assuming you're using Prisma

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
