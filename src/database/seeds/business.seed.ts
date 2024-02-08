import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBusinesses() {
  await prisma.business.deleteMany({});

  const businesses = [
    {
      name: 'Data Driven Technologies',
      rcNo: 'zc-88393',
    },
    {
      name: 'J&F Empire Cargo Logistics',
      rcNo: 'jf-6763',
    },
    {
      name: 'Emhaglo Cargo Logistics',
      rcNo: 'em-2452',
    },
  ];

  try {
    businesses.map(async (b) => {
      await prisma.business.create({
        data: {
          name: b.name,
          rcNo: b.rcNo,
        },
      });
    });
  } catch (error) {
    console.error('failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
