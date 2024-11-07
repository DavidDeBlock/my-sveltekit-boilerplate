# SvelteKit Boilerplate

A modern SvelteKit boilerplate with authentication, database, UI components, and internationalization support.

## Features

- 🔐 **Authentication** with [Lucia Auth](https://lucia-auth.com/)
  - Session-based authentication
  - Password hashing with Argon2
  - Protected routes
  - User profiles with avatars

- 🎨 **UI Components** with [Skeleton UI](https://www.skeleton.dev/)
  - Fully customizable theme
  - Toast notifications
  - Form components
  - Responsive layout

- 📝 **Database** with [Drizzle ORM](https://orm.drizzle.team/)
  - Type-safe SQL queries
  - SQLite database (easily switchable to PostgreSQL)
  - Database migrations
  - Schema management

- 🌍 **Internationalization** with [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
  - Type-safe translations
  - Multiple language support (en, nl)
  - Automatic route localization

- 📚 **Component Development** with [Storybook](https://storybook.js.org/)
  - Component documentation
  - Visual testing
  - Component playground

## Prerequisites

- Node.js 18+
- npm or pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sveltekit-boilerplate
```

2. Clone the repository:
npm install
# or
pnpm install

3. Copy the environment file:
cp .env.example .env

4. Copy the environment file:
npm run db:push

5.Development
Start the development server:

npm run dev

# Run Storybook
npm run storybook

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint

# Database commands
npm run db:push     # Push schema changes
npm run db:generate # Generate migrations
npm run db:migrate  # Run migrations
npm run db:studio   # Open Drizzle Studio


Prject structure
├── src/
│   ├── lib/            # Shared components and utilities
│   ├── routes/         # SvelteKit routes
│   ├── stories/        # Storybook stories
│   └── app.html        # HTML template
├── static/             # Static assets
├── drizzle/            # Database migrations
├── messages/           # Translation files
├── .storybook/        # Storybook configuration
└── tests/             # Test files


Environment Variables
Variable	Description
DATABASE_URL	Path to SQLite database file


Features Guide
Authentication
The authentication system uses Lucia with session-based auth. Protected routes are under /protected/* and require a valid session.

Database
The project uses Drizzle ORM with SQLite. Database schema is defined in schema.ts.

Internationalization
Translations are managed through Paraglide. Add new translations in the messages directory.

UI Components
The project uses Skeleton UI for components. Custom components can be found in components.

Storybook
Component stories are in stories. Run Storybook to view and develop components in isolation.

Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request