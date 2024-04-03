import { sql } from '@vercel/postgres';

import {
    User,
    Travel
} from './definitions';

import { unstable_noStore as noStore } from 'next/cache';

//TRAVEL fetchs
const ITEMS_PER_PAGE = 6;
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
        travels.date::text ILIKE ${`%${query}%`}
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
      travels.date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
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