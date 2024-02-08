import { seedBusinesses } from './business.seed';

async function seeder() {
  try {
    await seedBusinesses();
    console.log('seeding successful');
  } catch (error) {
    console.error('Seed failed:', error);
  }
}

seeder().catch((error) => {
  console.error('Seed process failed:', error);
});
