import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

export type TodoFilter = 'all' | 'active' | 'completed';

// Create the store state
const store = $state({
  todos: [] as Todo[],
  loading: false,
  error: null as string | null,
  filter: 'all' as TodoFilter
});

// Store actions
export const todoStore = {
  // Load todos from API
  async loadTodos() {
    store.loading = true;
    store.error = null;
    try {
      const response = await fetch('/api/todos');
      store.todos = await response.json();
    } catch (error) {
      store.error = 'Failed to load todos';
    } finally {
      store.loading = false;
    }
  },

  // Create new todo
  async addTodo(input: CreateTodoInput) {
    store.loading = true;
    store.error = null;
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      });
      const newTodo = await response.json();
      store.todos = [...store.todos, newTodo];
    } catch (error) {
      store.error = 'Failed to create todo';
    } finally {
      store.loading = false;
    }
  },

  // Update existing todo
  async updateTodo(id: string, input: UpdateTodoInput) {
    store.loading = true;
    store.error = null;
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedTodo = await response.json();
      store.todos = store.todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      );
    } catch (error) {
      store.error = 'Failed to update todo';
    } finally {
      store.loading = false;
    }
  },

  // Delete todo
  async deleteTodo(id: string) {
    store.loading = true;
    store.error = null;
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      store.todos = store.todos.filter(todo => todo.id !== id);
    } catch (error) {
      store.error = 'Failed to delete todo';
    } finally {
      store.loading = false;
    }
  },

  // Set filter
  setFilter(filter: TodoFilter) {
    store.filter = filter;
  },

  // Reset store
  reset() {
    store.todos = [];
    store.loading = false;
    store.error = null;
    store.filter = 'all';
  }
};

// Derived store for filtered todos
export const filteredTodos = $derived(() => {
  switch (store.filter) {
    case 'active':
      return store.todos.filter(todo => !todo.completed);
    case 'completed':
      return store.todos.filter(todo => todo.completed);
    default:
      return store.todos;
  }
});