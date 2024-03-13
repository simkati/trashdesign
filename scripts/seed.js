const { db } = require("@vercel/postgres");

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          titleHu VARCHAR(255) NOT NULL UNIQUE,
          titleDe VARCHAR(255),
          titleGb VARCHAR(255),
          price INT NOT NULL,
          status TEXT,
          category TEXT,
          descriptionHu VARCHAR(5000),
          descriptionDe VARCHAR(5000),
          descriptionGb VARCHAR(5000),
          galleryFolder VARCHAR(255) NOT NULL UNIQUE,
          gallery VARCHAR[],
          modifyDate DATE NOT NULL
        );
      `;

    console.log(`Created "products" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedProducts(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
