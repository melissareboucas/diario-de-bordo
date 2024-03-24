const { db } = require('@vercel/postgres');
const {
    users,
    travels
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255)
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
          INSERT INTO users (id, name, email, password, image_url)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.image_url})
          ON CONFLICT (id) DO NOTHING;
        `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedTravels(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "travels" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS travels (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        originCity VARCHAR(255) NOT NULL,
        originCountry VARCHAR(255) NOT NULL,
        destinyCity VARCHAR(255) NOT NULL,
        destinyCountry VARCHAR(255) NOT NULL,
        distanceInMeters INT NOT NULL,
        date DATE NOT NULL
    );
    `;

        console.log(`Created "travels" table`);

        // Insert data into the "travels" table
        const insertedTravels = await Promise.all(
            travels.map(
                (travel) => client.sql`
          INSERT INTO travels (user_id, originCity, originCountry, destinyCity, destinyCountry, distanceInMeters, date)
          VALUES (${travel.user_id}, ${travel.originCity}, ${travel.originCountry}, ${travel.destinyCity}, ${travel.destinyCountry}, ${travel.distanceInMeters}, ${travel.date})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );

        console.log(`Seeded ${insertedTravels.length} travels`);

        return {
            createTable,
            invoices: insertedTravels,
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}



async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedTravels(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
