<!-- src/lib/features/todos/components/TodoFilters.svelte -->
<script lang="ts">
    import { todoStore } from '../stores/todoStore';
    import type { TodoFilter } from '../stores/todoStore';
  
    const filters: TodoFilter[] = ['all', 'active', 'completed'];
    $: activeFilter = $todoStore.filter;
  </script>
  
  <div class="flex justify-center gap-2 my-4">
    {#each filters as filter}
      <button
        class="btn"
        class:variant-filled-primary={activeFilter === filter}
        class:variant-ghost={activeFilter !== filter}
        on:click={() => todoStore.setFilter(filter)}
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </button>
    {/each}
  </div>