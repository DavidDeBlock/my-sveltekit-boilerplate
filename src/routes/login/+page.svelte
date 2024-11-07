<script lang="ts">
 import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    let { form } = $props<{ form: ActionData }>();
    
    let username = $state('');
    let password = $state('');
    
    const isValidUsername = $derived(
        username.length >= 3 && 
        username.length <= 31 && 
		/^[a-z0-9_-]+$/.test(username)
    );
</script>

<div class="w-1/2 mx-auto space-y-4">
    <h1 class="h1">Login/Register</h1>
    <form method="post" action="?/login" use:enhance class="space-y-4">
        <label class="label">
            <span>Username</span>
            <input 
                class="input" 
                name="username"
                bind:value={username}
                pattern="[a-z0-9_\-]+"
                minlength="3"
                maxlength="31"
                required
            />
            <span class="text-sm text-surface-500">
                3-31 characters, lowercase letters, numbers, underscore, hyphen only
            </span>
        </label>

        <label class="label">
            <span>Password</span>
            <input 
                class="input" 
                type="password" 
                name="password"
                bind:value={password}
                minlength="6"
                required
            />
            <span class="text-sm text-surface-500">
                Minimum 6 characters
            </span>
        </label>

        <div class="flex gap-4">
            <button class="btn variant-filled" disabled={!isValidUsername}>Login</button>
            <button class="btn variant-filled" formaction="?/register" disabled={!isValidUsername}>Register</button>
        </div>
    </form>

    {#if form?.message}
        <p class="alert variant-filled-error">{form.message}</p>
    {/if}
</div>