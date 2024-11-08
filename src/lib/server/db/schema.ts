import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';


export const user = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),

	displayName: text('display_name'),
    fullName: text('full_name'),
    email: text('email').unique(),
    avatarUrl: text('avatar_url')
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});


// Define the schema for a todos table
export const todos = sqliteTable('todos', {
	id: text('id').primaryKey().$defaultFn(() => uuidv4()),
	userId: text('user_id')
	  .notNull()
	  .references(() => user.id),
	title: text('title').notNull(),
	description: text('description'),
	completed: integer('completed', { mode: 'boolean' })
	  .notNull()
	  .default(false),
	createdAt: integer('created_at', { mode: 'timestamp' })
	  .notNull()
	  .default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
	  .default(sql`CURRENT_TIMESTAMP`)
  });

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
export type ProfileUpdate = Pick<User, 'displayName' | 'fullName' | 'email' | 'avatarUrl'>;

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;