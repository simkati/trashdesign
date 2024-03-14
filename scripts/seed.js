const { db } = require("@vercel/postgres");

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS products (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          title_hu VARCHAR(255) NOT NULL UNIQUE,
          title_de VARCHAR(255),
          title_gb VARCHAR(255),
          price INT NOT NULL,
          status TEXT,
          category TEXT,
          description_hu VARCHAR(5000),
          description_de VARCHAR(5000),
          description_gb VARCHAR(5000),
          gallery_folder VARCHAR(255) NOT NULL UNIQUE,
          gallery VARCHAR[],
          modify_date DATE NOT NULL
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
