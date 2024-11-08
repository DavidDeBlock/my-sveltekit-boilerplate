<!-- src/lib/features/todos/components/TodoForm.svelte -->
<script lang="ts">
    import { todoStore } from '../stores/todoStore';
    import type { CreateTodoInput } from '../types/todo';
  
    let title = '';
    let description = '';
    let submitting = false;
  
    async function handleSubmit() {
      if (!title.trim()) return;
      
      submitting = true;
      const input: CreateTodoInput = {
        title: title.trim(),
        description: description.trim() || undefined
      };
  
      await todoStore.addTodo(input);
      title = '';
      description = '';
      submitting = false;
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="card p-4 space-y-4">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        id="title"
        type="text"
        bind:value={title}
        placeholder="What needs to be done?"
        required
        class="input"
      />
    </div>
  
    <div class="form-group">
      <label for="description">Description (optional)</label>
      <textarea
        id="description"
        bind:value={description}
        placeholder="Add details..."
        class="textarea"
      />
    </div>
  
    <button
      type="submit"
      class="btn variant-filled-primary w-full"
      disabled={submitting || !title.trim()}
    >
      {submitting ? 'Adding...' : 'Add Todo'}
    </button>
  </form>