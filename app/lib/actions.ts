'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { error } from 'console';

//import { signIn } from '@/auth';
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
  travelimage: z.string(),
  description: z.string()
});

const CreateTravel = FormSchema.omit({ id: true, date: true });

const UpdateTravel = FormSchema.omit({ id: true, date: true });

const PostsFormSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  travels_id: z.string(),
  title: z.string(),
  posttext: z.string(),
  postdate: z.string()
})

const CreatePost = PostsFormSchema.omit({ id: true, postdate: true })
const UpdatePost = PostsFormSchema.omit({ id: true, postdate: true })

export type State = {
  errors?: {
    user_id?: string[];
    origincity?: string[];
    origincountry?: string[];
    destinycity?: string[];
    destinycountry?: string[];
    distanceinmeters?: string[];
    travelimage?: string[];
    description?: string[];
  };
  message?: string | null;
};

export type PostState = {
  errors?: {
    user_id?: string[];
    travels_id?: string[];
    title?: string[];
    posttext?: string[];
  };
  message?: string | null;
}

//TRAVELS CRUD
/* outdated - this function uses form
export async function createTravel(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTravel.safeParse({
    //user_id: formData.get('user_id'),
    origincity: formData.get('origincity'),
    origincountry: formData.get('origincountry'),
    destinycity: formData.get('destinycity'),
    destinycountry: formData.get('destinycountry'),
    distanceinmeters: formData.get('distanceinmeters'),
    travelimage: formData.get('travelimage'),
    description: formData.get('description')
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { origincity, origincountry, destinycity, destinycountry, distanceinmeters, travelimage, description } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO travels (user_id, origincity, origincountry, destinycity, destinycountry, distanceinmeters, date, travelimage, description)
        VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', ${origincity}, ${origincountry}, ${destinycity}, ${destinycountry}, ${distanceinmeters}, ${date}, ${travelimage}, ${description})
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
*/

//updated - this function uses the fields directly
export async function createTravel(origincity: string, origincountry: string, originlatitude: number, originlongitude: number,
  destinycity: string, destinycountry: string, destinylatitude: number, destinylongitude: number,
  distanceinmeters: number, modal: string, travelimage: string, description: string) {

  //const date = new Date().toISOString().split('T')[0];
  const date = new Date().toISOString()
  console.log(date)
    // Insert data into the database
    try {
      await sql`
          INSERT INTO travels (user_id, origincity, origincountry, originlatitude, originlongitude,
            destinycity, destinycountry, destinylatitude, destinylongitude,
            distanceinmeters, modal, date, travelimage, description)
          VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', ${origincity}, ${origincountry}, ${originlatitude}, ${originlongitude},
          ${destinycity}, ${destinycountry}, ${destinylatitude}, ${destinylongitude},
          ${distanceinmeters}, ${modal}, ${date}, ${travelimage}, ${description})
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

export async function updateTravel2(id: string, origincity: string, origincountry: string, originlatitude: number, originlongitude: number,
  destinycity: string, destinycountry: string, destinylatitude: number, destinylongitude: number,
  distanceinmeters: number, modal: string, travelimage: string, description: string) {

  try {
    await sql`
        UPDATE travels
        SET user_id = '410544b2-4001-4271-9855-fec4b6a6442a', 
        origincity = ${origincity}, origincountry = ${origincountry}, originlatitude = ${originlatitude}, originlongitude = ${originlongitude},
        destinycity = ${destinycity}, destinycountry = ${destinycountry}, destinylatitude = ${destinylatitude}, destinylongitude = ${destinylongitude},
        distanceinmeters = ${distanceinmeters}, modal = ${modal}, travelimage = ${travelimage}, description = ${description}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Travel.' };
  }

  revalidatePath('/profile/travels');
  redirect('/profile/travels');

}


export async function updateTravel(id: string, formData: FormData) {
  console.log(formData)

  const { origincity, origincountry, destinycity, destinycountry, distanceinmeters, description } = UpdateTravel.parse({
    origincity: formData.get('origincity'),
    origincountry: formData.get('origincountry'),
    destinycity: formData.get('destinycity'),
    destinycountry: formData.get('destinycountry'),
    distanceinmeters: formData.get('distanceinmeters'),
    travelimage: formData.get('travelimage'),
    description: formData.get('description')
  });

  //const distanceinkm = distanceinmeters / 1000;

  try {
    await sql`
        UPDATE travels
        SET user_id = '410544b2-4001-4271-9855-fec4b6a6442a', origincity = ${origincity}, origincountry = ${origincountry}, destinycity = ${destinycity}, 
        destinycountry = ${destinycountry}, distanceinmeters = ${distanceinmeters}, travelimage = '/assets/sp.png', description = ${description}
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

//POSTS CRUD
export async function createPost(prevState: PostState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePost.safeParse({
    user_id: formData.get('user_id'),
    travels_id: formData.get('travels_id'),
    title: formData.get('title'),
    posttext: formData.get('posttext'),
  });

  
  

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }
  // Prepare data for insertion into the database
  const { travels_id, title, posttext } = validatedFields.data;
  const postdate = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO posts (user_id, travels_id, title, posttext, postdate)
        VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', ${travels_id}, ${title}, ${posttext}, ${postdate})
      `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }


  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/profile/travels/${travels_id}/posts`);
  redirect(`/profile/travels/${travels_id}/posts`);


}

export async function updatePost(id: string, formData: FormData) {
  const { user_id, travels_id, title, posttext } = UpdatePost.parse({
    user_id: formData.get('user_id'),
    travels_id: formData.get('travels_id'),
    title: formData.get('title'),
    posttext: formData.get('posttext'),
  });

  try {
    await sql`
        UPDATE posts
        SET user_id = '410544b2-4001-4271-9855-fec4b6a6442a', travels_id = ${travels_id}, title = ${title}, posttext = ${posttext}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Post.' };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/profile/travels/${travels_id}/posts`);
  redirect(`/profile/travels/${travels_id}/posts`);

}

export async function deletePost(id: string, travels_id: string) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath(`/profile/travels/${travels_id}/posts`);
    return { message: 'Deleted Post.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Post.' };
  }
}

//LOGIN
/*
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
*/