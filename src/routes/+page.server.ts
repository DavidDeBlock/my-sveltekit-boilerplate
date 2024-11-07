// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as auth from '$lib/server/auth';

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
            return redirect(302, '/login');
        }
        
        await auth.invalidateSession(event.locals.session.id);
        auth.deleteSessionTokenCookie(event);
        
        return redirect(302, '/login');
    }
};