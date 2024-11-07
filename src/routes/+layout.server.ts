// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    const isPublicRoute = url.pathname === '/login';
    
    if (!isPublicRoute && !locals.user) {
        throw redirect(303, '/login');
    }

    return {
        user: locals.user
    };
};
