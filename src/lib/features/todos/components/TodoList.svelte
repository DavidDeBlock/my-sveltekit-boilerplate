<!-- src/lib/features/todos/components/TodoList.svelte -->
<script lang="ts">
    import { todoStore, filteredTodos } from '../stores/todoStore';
    import TodoItem from './TodoItem.svelte';
    import TodoFilters from './TodoFilters.svelte';

  
    $: todos = $filteredTodos;
    $: loading = $todoStore.loading;
    $: error = $todoStore.error;

    
    
  </script>

    <TodoFilters />
  {#if loading}
    <div class="flex justify-center p-4">
      <div class="spinner" />
    </div>
  {:else if error}
    <div class="alert variant-filled-error">{error}</div>
  {:else if todos.length === 0}
    <div class="card p-4 text-center">No todos found.</div>
  {:else}
    <div class="space-y-2">
      {#each todos as todo (todo.id)}
        <TodoItem {todo} />
      {/each}
    </div>
  {/if}
  
