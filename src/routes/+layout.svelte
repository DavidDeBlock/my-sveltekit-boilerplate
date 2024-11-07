<script lang="ts">
    import { i18n } from '$lib/i18n';
    import { ParaglideJS } from '@inlang/paraglide-sveltekit';   
    import '../app.css';

	import { onMount } from 'svelte';
    import { browser } from '$app/environment';

	import TopNav from '$lib/components/navigation/TopNav.svelte';
	import BottomNav from '$lib/components/navigation/BottomNav.svelte';

    import { initializeStores, Toast } from '@skeletonlabs/skeleton';

    let { children, data } = $props();

	onMount(() => {
        // Check for saved theme preference
        if (!browser) return;
        const isDark = window.localStorage.getItem('theme') === 'dark';
        if (isDark) document.documentElement.classList.add('dark');
        
    });

    initializeStores();
</script>

<ParaglideJS {i18n}>
    <div class="flex flex-col min-h-[100dvh] bg-surface-500">
        
        <!-- Top Nav -->
        <TopNav user={data.user} />
        <!-- Main Content -->
        <main class="flex-1 container mx-auto p-4">
            {@render children()}
        </main>

        <!-- Footer -->
		<BottomNav />
    </div>
</ParaglideJS>


<Toast position="tr" duration={4000} />