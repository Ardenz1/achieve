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
  