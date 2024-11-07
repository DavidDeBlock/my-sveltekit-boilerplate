<!-- src/lib/components/navigation/TopNav.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    import { browser } from '$app/environment';

    let { user } = $props<{ user: { username: string } | null }>();

    function toggleMode() {
        if (!browser) return;
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
</script>

<header class="sticky top-0 w-full border-b border-surface-500 bg-surface-100-800-token z-10">
    <div class="container mx-auto flex justify-between items-center p-4">
        <span class="text-2xl font-bold">Logo</span>
        <nav class="flex items-center gap-4">
            <a href="/" class="btn variant-ghost">Home</a>
            <a href="/features/profile" class="btn variant-ghost">Profile</a>
            
            {#if user}
                <form 
                    action="/?/logout" 
                    method="POST" 
                    use:enhance={() => {
                        return async ({ result }) => {
                            if (result.type === 'redirect') {
                                window.location.href = result.location;
                            }
                        };
                    }}
                >
                    <button type="submit" class="btn variant-ghost">
                        Logout ({user.username})
                    </button>
                </form>           
            {/if}
        
            <button class="btn variant-ghost" on:click={toggleMode}>
                🌗
            </button>            
        </nav>
    </div>
</header>