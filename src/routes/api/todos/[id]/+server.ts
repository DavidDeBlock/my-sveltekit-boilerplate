// src/routes/api/todos/[id]/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const PATCH: RequestHandler = async ({ request, params, locals }) => {
  if (!locals.session || !locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const updates = await request.json();

  const [updatedTodo] = await db.update(todos)
    .set({
      ...updates,
      updatedAt: new Date()
    })
    .where(
      and(
        eq(todos.id, params.id),
        eq(todos.userId, locals.user.id)
      )
    )
    .returning();

  if (!updatedTodo) {
    return new Response('Not found', { status: 404 });
  }

  return json(updatedTodo);
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  if (!locals.session || !locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  await db.delete(todos)
    .where(
      and(
        eq(todos.id, params.id),
        eq(todos.userId, locals.user.id)
      )
    );

  return new Response(null, { status: 204 });
};