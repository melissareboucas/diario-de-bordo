'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { error } from 'console';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';



const FormSchema = z.object({
  id: z.string(),
  //user_id: z.string(),
  origincity: z.string({
    invalid_type_error: 'Selecione uma cidade',
  }),
  origincountry: z.string({
    invalid_type_error: 'Selecione um país',
  }),
  destinycity: z.string({
    invalid_type_error: 'Selecione uma cidade',
  }),
  destinycountry: z.string({
    invalid_type_error: 'Selecione um país',
  }),
  distanceinmeters: z.string({
    invalid_type_error: 'Selecione a distancia',
  }),
  date: z.string(),
});

const CreateTravel = FormSchema.omit({ id: true, date: true });

const UpdateTravel = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    user_id?: string[];
    origincity?: string[];
    origincountry?: string[];
    destinycity?: string[];
    destinycountry?: string[];
    distanceinmeters?: string[];
  };
  message?: string | null;
};


export async function updateTravel(id: string, formData: FormData) {
  console.log(formData)

  const { origincity, origincountry, destinycity, destinycountry, distanceinmeters } = UpdateTravel.parse({
    origincity: formData.get('origincity'),
    origincountry: formData.get('origincountry'),
    destinycity: formData.get('destinycity'),
    destinycountry: formData.get('destinycountry'),
    distanceinmeters: formData.get('distanceinmeters'),
  });

  //const distanceinkm = distanceinmeters / 1000;

  try {
    await sql`
        UPDATE travels
        SET user_id = '410544b2-4001-4271-9855-fec4b6a6442a', origincity = ${origincity}, origincountry = ${origincountry}, destinycity = ${destinycity}, 
        destinycountry = ${destinycountry}, distanceinmeters = ${distanceinmeters}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Travel.' };
  }

  revalidatePath('/profile/travels');
  redirect('/profile/travels');

}

export async function deleteTravel(id: string) {
  try {
    await sql`DELETE FROM travels WHERE id = ${id}`;
    revalidatePath('/profile/travels');
    return { message: 'Deleted Travel.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Travel.' };
  }
}

export async function createTravel(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTravel.safeParse({
    //user_id: formData.get('user_id'),
    origincity: formData.get('origincity'),
    origincountry: formData.get('origincountry'),
    destinycity: formData.get('destinycity'),
    destinycountry: formData.get('destinycountry'),
    distanceinmeters: formData.get('distanceinmeters'),
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { origincity, origincountry, destinycity, destinycountry, distanceinmeters } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO travels (user_id, origincity, origincountry, destinycity, destinycountry, distanceinmeters, date)
        VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', ${origincity}, ${origincountry}, ${destinycity}, ${destinycountry}, ${distanceinmeters}, ${date})
      `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/profile/travels');
  redirect('/profile/travels');

}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/*
export async function createTravel(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTravel.safeParse({
    user_id: formData.get('user_id'),
    origincity: formData.get('origincity'),
    origincountry: formData.get('origincountry'),
    destinycity: formData.get('destinycity'),
    destinycountry: formData.get('destinycountry'),
    distanceinmeters: formData.get('distanceinmeters'),
  });
 
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Travel.',
    };
  }
  
 
  // Prepare data for insertion into the database
  const { user_id, origincity, origincountry, destinycity, destinycountry, distanceinmeters } = validatedFields.data;
  //const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO travels (user_id, origincity, origincountry, destinycity, destinycountry distanceinmeters, date)
      VALUES (${user_id}, ${origincity}, ${origincountry}, ${destinycity}, ${destinycountry}, ${distanceinmeters}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Travel.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/profile/travels');
  redirect('/profile/travels');
}



*/