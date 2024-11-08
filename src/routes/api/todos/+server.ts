// src/routes/api/todos/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.session || !locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userTodos = await db.select().from(todos)
    .where(eq(todos.userId, locals.user.id));
  
  return json(userTodos);
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.session || !locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { title, description } = await request.json();
  
  const [newTodo] = await db.insert(todos)
    .values({
      title,
      description,
      userId: locals.user.id
    })
    .returning();

  return json(newTodo);
};