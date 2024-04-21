import { sql } from '@vercel/postgres';

import {
  User,
  Travel,
  Post
} from './definitions';

import { unstable_noStore as noStore } from 'next/cache';
import { constrainedMemory } from 'process';

//TRAVEL fetchs
const ITEMS_PER_PAGE = 4;
export async function fetchTravels() {
  noStore();
  try {
    const travels = await sql`SELECT * from travels`
    return travels.rows as Travel[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch travels.');
  }
}

export async function fetchTravelById(id: string) {
  noStore();
  try {
    const travel = await sql`SELECT * FROM travels WHERE id=${id}`;
    return travel.rows[0] as Travel;
  } catch (error) {
    console.error('Failed to fetch travel:', error);
    throw new Error('Failed to fetch travel.');
  }
}

export async function fetchFilteredTravels(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const travels = await sql`
      SELECT
        travels.id,
        travels.user_id,
        travels.origincity,
        travels.origincountry,
        travels.destinycity,
        travels.destinycountry,
        travels.distanceinmeters,
        travels.date,
        travels.travelimage,
        travels.description,
        users.name,
        users.email,
        users.image_url
      FROM travels
      JOIN users ON travels.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        travels.origincity::text ILIKE ${`%${query}%`} OR
        travels.origincountry::text ILIKE ${`%${query}%`} OR
        travels.destinycity::text ILIKE ${`%${query}%`} OR
        travels.destinycountry::text ILIKE ${`%${query}%`} OR
        travels.distanceinmeters::text ILIKE ${`%${query}%`} OR
        travels.date::text ILIKE ${`%${query}%`} OR
        travels.description::text ILIKE ${`%${query}%`}
      ORDER BY travels.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return travels.rows;
  } catch (error) {
    throw new Error('Failed to fetch travels.');
  }
}

export async function fetchTravelsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM travels
    JOIN users ON travels.user_id = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      travels.origincity::text ILIKE ${`%${query}%`} OR
      travels.origincountry::text ILIKE ${`%${query}%`} OR
      travels.destinycity::text ILIKE ${`%${query}%`} OR
      travels.destinycountry::text ILIKE ${`%${query}%`} OR
      travels.distanceinmeters::text ILIKE ${`%${query}%`} OR
      travels.date::text ILIKE ${`%${query}%`} OR
      travels.description::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

//POSTS fetchs
export async function fetchPosts() {
  noStore();
  try {
    const posts = await sql`SELECT * from posts`
    return posts.rows as Post[];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }

}

export async function fetchPostById(id: string) {
  noStore();
  try {
    const post = await sql`SELECT * FROM posts WHERE id=${id}`;
    return post.rows[0] as Post;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    //throw new Error('Failed to fetch post.');
  }
}

export async function fetchPostsByTravelId(travels_id: string) {
  noStore();
  try {
    const post = await sql`SELECT * FROM posts WHERE travels_id=${travels_id}`;
    return post.rows;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    throw new Error('Failed to fetch post.');
  }
}

//USER fetchs
export async function fetchUsers() {
  noStore();
  try {
    const users = await sql`SELECT * FROM users`;
    return users.rows as User[];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUser(id: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserByEmail(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

//TOTALS fetchs
export async function fetchTotalKmByUser(id: string) {
  noStore();
  try {
    const sumMeters = await sql`SELECT sum(distanceinmeters) from travels WHERE user_id=${id}`
    const sumKm = Math.ceil(Number(sumMeters.rows[0].sum) / 1000);
    return sumKm;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sum.');
  }
}

export async function fetchTotalCountriesByUser(id: string) {
  noStore();
  try {
    const countries = await sql`SELECT count(DISTINCT destinycountry) from travels WHERE user_id=${id}`
    const countCountries = Math.ceil(Number(countries.rows[0].count));
    return countCountries;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sum.');
  }
}

export async function fetchTotalCitiesByUser(id: string) {
  noStore();
  try {
    const cities = await sql`SELECT count(DISTINCT destinycity) from travels WHERE user_id=${id}`
    const countCities = Math.ceil(Number(cities.rows[0].count));
    return countCities;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sum.');
  }
}


export function calculateDistance(
  originLat: number,
  originLng: number,
  destinyLat: number,
  destinyLng: number
): number {
  // Raio médio da Terra em quilômetros
  const earthRadiusKm: number = 6371;

  // Conversão de graus para radianos
  function toRadians(degrees: number): number {
      return degrees * Math.PI / 180;
  }

  // Diferença de latitude e longitude
  const deltaLat: number = toRadians(destinyLat - originLat);
  const deltaLng: number = toRadians(destinyLng - originLng);

  // Cálculo da distância entre os pontos usando a fórmula de Haversine
  const a: number = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                    Math.cos(toRadians(originLat)) * Math.cos(toRadians(destinyLat)) *
                    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = earthRadiusKm * c;

  return distance;
}






/*
export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
*/