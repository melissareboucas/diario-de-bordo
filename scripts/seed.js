const { db } = require('@vercel/postgres');
const {
    users,
    travels,
    posts
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
        image_url TEXT
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
        originLatitude DECIMAL(10, 7) NOT NULL,
        originLongitude DECIMAL(10, 7) NOT NULL,
        destinyCity VARCHAR(255) NOT NULL,
        destinyCountry VARCHAR(255) NOT NULL,
        destinyLatitude DECIMAL(10, 7) NOT NULL,
        destinyLongitude DECIMAL(10, 7) NOT NULL,
        distanceInMeters INT NOT NULL,
        modal VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        travelimage TEXT,
        description TEXT NOT NULL
    );
    `;

        console.log(`Created "travels" table`);
        /*
        // Insert data into the "travels" table
        const insertedTravels = await Promise.all(
            travels.map(
                (travel) => client.sql`
          INSERT INTO travels (id, user_id, originCity, originCountry, originLatitude, originLongitude, 
            destinyCity, destinyCountry, destinyLatitude, destinyLongitude,
            distanceInMeters, modal, date, travelimage, description)
          VALUES (${travel.id}, ${travel.user_id}, 
            ${travel.originCity}, ${travel.originCountry}, ${travel.originLatitude}, ${travel.originLongitude},
            ${travel.destinyCity}, ${travel.destinyCountry}, ${travel.destinyLatitude}, ${travel.destinyLongitude},
            ${travel.distanceInMeters}, ${travel.modal}, ${travel.date}, ${travel.travelimage}, ${travel.description})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );

        console.log(`Seeded ${insertedTravels.length} travels`);
        */
        return {
            createTable,
           // invoices: insertedTravels,
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}

async function seedPosts(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "posts" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        travels_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        posttext TEXT NOT NULL,
        postdate DATE NOT NULL
    );
    `;

        console.log(`Created "posts" table`);

        /* 
        // Insert data into the "posts" table
        const insertedPosts = await Promise.all(
            posts.map(
                (post) => client.sql`
          INSERT INTO posts (user_id, travels_id, title, posttext, postdate)
          VALUES (${post.user_id}, ${post.travels_id}, ${post.title}, ${post.posttext}, ${post.postdate})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );

        console.log(`Seeded ${insertedPosts.length} posts`);
        */
        return {
            createTable,
            //posts: insertedPosts,
        };
    } catch (error) {
        console.error('Error seeding posts:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedTravels(client);
    await seedPosts(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
