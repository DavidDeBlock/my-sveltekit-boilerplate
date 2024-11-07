// +page.server.ts
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { uploadAvatar } from '$lib/server/storage';
import fs from 'fs/promises';


export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return {
            user: null
        };
    }

    try {
        const userData = await db
            .select({
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                fullName: user.fullName,
                avatarUrl: user.avatarUrl,
            })
            .from(user)
            .where(eq(user.id, locals.user.id))
            .get();

        return {
            user: userData
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            user: null
        };
    }
};






export const actions: Actions = {
    updateProfile: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401, { message: 'Unauthorized' });
        }

        const formData = await request.formData();
        const displayName = formData.get('displayName') as string;
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const avatar = formData.get('avatar') as File;

        try {
            let avatarUrl = locals.user.avatarUrl;
            if (avatar && avatar.size > 0) {
                // Delete old avatar if exists
                if (avatarUrl) {
                    const oldPath = `static${avatarUrl}`;
                    try {
                        await fs.unlink(oldPath);
                    } catch (error) {
                        console.error('Failed to delete old avatar:', error);
                    }
                }
                avatarUrl = await uploadAvatar(avatar);
            }

            await db
                .update(user)
                .set({
                    displayName,
                    fullName,
                    email,
                    avatarUrl
                })
                .where(eq(user.id, locals.user.id));

            return { type: 'success' as const };
        } catch (error) {
            return fail(500, { 
                type: 'error' as const,
                message: 'Failed to update profile',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
};