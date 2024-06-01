'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as bcrypt from 'bcryptjs';
import { createSessionToken, openSessionToken } from './auth-service';
import { cookies } from 'next/headers';



const FormSchema = z.object({
  id: z.string(),
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
export async function createTravel(user_id: string, origincity: string, origincountry: string, originlatitude: number, originlongitude: number,
  destinycity: string, destinycountry: string, destinylatitude: number, destinylongitude: number,
  distanceinmeters: number, modal: string, travelimage: string, description: string) {

  const date = new Date().toISOString()

  // Insert data into the database
  try {
    await sql`
          INSERT INTO travels (user_id, origincity, origincountry, originlatitude, originlongitude,
            destinycity, destinycountry, destinylatitude, destinylongitude,
            distanceinmeters, modal, date, travelimage, description)
          VALUES (${user_id}, ${origincity}, ${origincountry}, ${originlatitude}, ${originlongitude},
          ${destinycity}, ${destinycountry}, ${destinylatitude}, ${destinylongitude},
          ${distanceinmeters}, ${modal}, ${date}, ${travelimage}, ${description})
        `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Travel.',
    };
  }

  revalidatePath('/profile/travels');
  redirect('/profile/travels');
}

export async function updateTravel(user_id: string, id: string, origincity: string, origincountry: string, originlatitude: number, originlongitude: number,
  destinycity: string, destinycountry: string, destinylatitude: number, destinylongitude: number,
  distanceinmeters: number, modal: string, travelimage: string, description: string) {

  try {
    await sql`
        UPDATE travels
        SET user_id = ${user_id}, 
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
  const { user_id, travels_id, title, posttext } = validatedFields.data;
  const postdate = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO posts (user_id, travels_id, title, posttext, postdate)
        VALUES (${user_id}, ${travels_id}, ${title}, ${posttext}, ${postdate})
      `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }

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
        SET user_id = ${user_id}, travels_id = ${travels_id}, title = ${title}, posttext = ${posttext}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(error)
    return { message: 'Database Error: Failed to Update Post.' };
  }

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


//LOGIN/SIGNUP
export async function createUser(name: string, email: string, password: string, image_url: string) {
  'use server';

  const hashpassword = await bcrypt.hash(password, 10);

  // Insert data into the database
  try {
    await sql`
    INSERT INTO users (name, email, password, image_url)
    VALUES (${name}, ${email}, ${hashpassword}, ${image_url})
  `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/login');
  redirect('/login');
}

export async function login(email: string, password: string) {
  'use server';

  const users = await sql`SELECT * FROM users WHERE email=${email}`;
  const user = users.rows[0];

  if (!user) {
    revalidatePath('/login');
    redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    console.log("usuário ou senha inválido");
    revalidatePath('/login');
    redirect('/login');
  }

  await createSessionToken({sub: user.id});

  revalidatePath('/profile');
  redirect('/profile');
}

export async function isSessionValid() {
  const sessionCookie = cookies().get('session')

  if (sessionCookie) {
    const {value} = sessionCookie;
    const {exp} = await openSessionToken(value);
    const currentDate = new Date().getTime();

    return ((exp as number)*1000) > currentDate; 
  }

  return false
}

export async function logout() {
  cookies().delete('session')
  revalidatePath('/');
  redirect('/');
}