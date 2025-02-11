import prisma from '@/database/client';


// Get all entrie
export async function getAllEntries() {
    const entries = await prisma.topic.findMany({

    });
    return entries;
  }


  // GET a single entry by id
export async function getentryById(entry_id) {
    const entry = await prisma.entry.findUnique({
      where: { entry_id: entry_id }
    });
    return entry;
  }
  
  import prisma from '@/database/client';

  // Get user by ID
  export async function getUserById(userId) {
      const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
              id: true,
              email: true,
              foodEntries: true,
          },
      });
      return user;
  }
  