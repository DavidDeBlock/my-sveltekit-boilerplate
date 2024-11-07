<script lang="ts">
    import type { PageData } from './$types';
    import { enhance, type SubmitFunction } from '$app/forms';
    import { getToastStore, Avatar } from '@skeletonlabs/skeleton';
    import { onDestroy } from 'svelte';
   
    export let data: PageData;
    const { user } = data;

    let avatarPreview: string | null = null;
    let fileInput: HTMLInputElement;
    let loading = false;

    const toastStore = getToastStore();

    // Form data
    let formData = {
        displayName: user?.displayName || '',
        fullName: user?.fullName || '',
        email: user?.email || ''
    };

    function handleFileSelect(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
            avatarPreview = URL.createObjectURL(file);
        }
    }

    onDestroy(() => {
        if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
        }
    });

    const submitHandler: SubmitFunction = () => {
        loading = true;
        
        return async ({ result }) => {
            loading = false;
            if (result.type === 'success') {
                toastStore.trigger({
                    message: 'Profile updated successfully!',
                    background: 'variant-filled-success'
                });
            } else {
                toastStore.trigger({
                    message: (result.data as { message?: string })?.message || 'Update failed',
                    background: 'variant-filled-error'
                });
            }
        };
    };
</script>

<div class="container mx-auto p-4 max-w-2xl">
    <h1 class="h1 mb-8">Profile Settings</h1>

    {#if user}
                <form
                method="POST"
                action="?/updateProfile"
                enctype="multipart/form-data"
                use:enhance={submitHandler}
            >
            <!-- Avatar Upload -->
            <div class="flex items-center space-x-4">
                <Avatar 
                    width="w-24" 
                    rounded="rounded-full" 
                    src={avatarPreview || user.avatarUrl || ''} 
                />
                <label class="btn variant-filled-primary">
                    Upload Avatar
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        class="hidden"
                        bind:this={fileInput}
                        on:change={handleFileSelect}
                    />
                </label>
            </div>

            <!-- Form Fields -->
            <div class="space-y-4">
                <label class="label">
                    <span>Display Name</span>
                    <input 
                        type="text" 
                        name="displayName"
                        class="input"
                        bind:value={formData.displayName}
                        placeholder="Display Name"
                    />
                </label>

                <label class="label">
                    <span>Full Name</span>
                    <input 
                        type="text" 
                        name="fullName"
                        class="input"
                        bind:value={formData.fullName}
                        placeholder="Full Name"
                    />
                </label>

                <label class="label">
                    <span>Email</span>
                    <input 
                        type="email" 
                        name="email"
                        class="input"
                        bind:value={formData.email}
                        placeholder="Email"
                    />
                </label>
            </div>

            <button 
                type="submit" 
                class="btn variant-filled-primary w-full"
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    {/if}
</div>
