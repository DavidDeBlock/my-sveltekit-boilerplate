<!-- src/routes/todos/+page.svelte -->
<script lang="ts">
    import TodoList from '$lib/features/todos/components/TodoList.svelte';
    import TodoForm from '$lib/features/todos/components/TodoForm.svelte';
    import { todoStore } from '$lib/features/todos/stores/todoStore';
    import { onMount } from 'svelte';
  
    onMount(() => {
      todoStore.loadTodos();
    });
  </script>
  
  <div class="container mx-auto p-4 max-w-2xl">
    <h1 class="h1 mb-4">Todos</h1>
    <TodoForm />
    <div class="mt-8">
      <TodoList />
    </div>
  </div>