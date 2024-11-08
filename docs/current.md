// todos table
{
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => user.id),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
}

src/lib/features/todos/
├── components/
│   ├── TodoList.svelte        # List of todos with filtering
│   ├── TodoItem.svelte        # Individual todo item
│   ├── TodoForm.svelte        # Create/edit form
│   └── TodoFilters.svelte     # Filter controls
├── types/
│   └── todo.ts               # TypeScript interfaces
└── stores/
    └── todoStore.ts          # Client-side state management

src/routes/todos/
├── +page.svelte             # Main todos page
├── +page.server.ts         # Server-side load function
├── +server.ts             # API endpoints
└── [id]/                  # Individual todo routes
    ├── +page.svelte
    └── +page.server.ts


Features to implement:

CRUD operations for todos
Mark todos as complete/incomplete
Filter todos by status (All/Active/Completed)
Sort by creation date
Protected routes (only authenticated users)
User-specific todos