<!-- src/lib/features/todos/components/TodoItem.svelte -->
<script lang="ts">
  import type { Todo } from '../types/todo';
  import { todoStore } from '../stores/todoStore';

  export let todo: Todo;
  let isEditing = false;
  let editTitle = todo.title;
  let editDescription = todo.description || '';

  async function toggleComplete() {
    await todoStore.updateTodo(todo.id, { completed: !todo.completed });
  }

  async function deleteTodo() {
    await todoStore.deleteTodo(todo.id);
  }

  async function handleEdit() {
    if (!editTitle.trim()) return;
    
    await todoStore.updateTodo(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined
    });
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;
    editTitle = todo.title;
    editDescription = todo.description || '';
  }
</script>

<div class="card p-4">
{#if isEditing}
  <form on:submit|preventDefault={handleEdit} class="space-y-4">
    <div class="form-group">
      <input
        type="text"
        bind:value={editTitle}
        class="input"
        placeholder="Todo title"
        required
      />
    </div>
    <div class="form-group">
      <textarea
        bind:value={editDescription}
        class="textarea"
        placeholder="Description (optional)"
      />
    </div>
    <div class="flex gap-2">
      <button type="submit" class="btn variant-filled-primary">Save</button>
      <button type="button" class="btn variant-filled-surface" on:click={cancelEdit}>Cancel</button>
    </div>
  </form>
{:else}
  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <input
        type="checkbox"
        checked={todo.completed}
        on:change={toggleComplete}
      />
      <div class="flex flex-col">
        <h3 class="text-lg font-semibold" class:line-through={todo.completed}>
          {todo.title}
        </h3>
        {#if todo.description}
          <p class="text-sm text-gray-600">{todo.description}</p>
        {/if}
      </div>
    </div>
    <div class="flex gap-2">
      <button class="btn variant-filled-surface" on:click={() => isEditing = true}>
        Edit
      </button>
      <button class="btn variant-filled-error" on:click={deleteTodo}>
        Delete
      </button>
    </div>
  </div>
{/if}
</div>