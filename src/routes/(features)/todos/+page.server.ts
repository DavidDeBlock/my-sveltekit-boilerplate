// src/routes/todos/+page.server.ts
import type { PageServerLoad } from './$types';
import type { SessionValidationResult } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
  // Access session and user from locals (set by handleAuth hook)
  const session = locals.session;
  const user = locals.user;

  // Return session info
  return {
    user,
    isAuthenticated: !!session
  };
};