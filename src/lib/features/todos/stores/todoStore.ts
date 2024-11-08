import { writable, derived } from 'svelte/store';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

export type TodoFilter = 'all' | 'active' | 'completed';

// Create the store state
const store = writable({
  todos: [] as Todo[],
  loading: false,
  error: null as string | null,
  filter: 'all' as TodoFilter
});

// Store actions
export const todoStore = {
  subscribe: store.subscribe,
  
  // Load todos from API
  async loadTodos() {
    store.update(s => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      store.update(s => ({ ...s, todos }));
    } catch (error) {
      store.update(s => ({ ...s, error: 'Failed to load todos' }));
    } finally {
      store.update(s => ({ ...s, loading: false }));
    }
  },

    // Create new todo
    async addTodo(input: CreateTodoInput) {
      store.update(s => ({ ...s, loading: true, error: null }));
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' }
        });
        const newTodo = await response.json();
        store.update(s => ({
          ...s,
          todos: [...s.todos, newTodo]
        }));
      } catch (error) {
        store.update(s => ({ ...s, error: 'Failed to create todo' }));
      } finally {
        store.update(s => ({ ...s, loading: false }));
      }
    },
  
    // Update existing todo
    async updateTodo(id: string, input: UpdateTodoInput) {
      store.update(s => ({ ...s, loading: true, error: null }));
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' }
        });
        const updatedTodo = await response.json();
        store.update(s => ({
          ...s,
          todos: s.todos.map(todo => todo.id === id ? updatedTodo : todo)
        }));
      } catch (error) {
        store.update(s => ({ ...s, error: 'Failed to update todo' }));
      } finally {
        store.update(s => ({ ...s, loading: false }));
      }
    },
  
    // Delete todo
    async deleteTodo(id: string) {
      store.update(s => ({ ...s, loading: true, error: null }));
      try {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        store.update(s => ({
          ...s,
          todos: s.todos.filter(todo => todo.id !== id)
        }));
      } catch (error) {
        store.update(s => ({ ...s, error: 'Failed to delete todo' }));
      } finally {
        store.update(s => ({ ...s, loading: false }));
      }
    },

  // Set filter
  setFilter(filter: TodoFilter) {
    store.update(s => ({ ...s, filter }));
  },

  // Reset store
  reset() {
    store.set({
      todos: [],
      loading: false,
      error: null,
      filter: 'all'
    });
  }
};

// Derived store for filtered todos
export const filteredTodos = derived(todoStore, $store => {
  switch ($store.filter) {
    case 'active':
      return $store.todos.filter(todo => !todo.completed);
    case 'completed':
      return $store.todos.filter(todo => todo.completed);
    default:
      return $store.todos;
  }
});