# SvelteKit Boilerplate Project Instructions

## Project Overview
- Modern full-stack SvelteKit application
- Type-safe with TypeScript
- Database integration with Drizzle ORM
- UI components using Skeleton UI
- Authentication using Lucia
- Component documentation with Storybook

## Tech Stack Requirements
- Sveltekit (latest version) with runes
- Node.js 18+
- npm (preferred package manager)
- SqlLite database
- TypeScript 5.0+

# Project Structure

```plaintext
project-root/
├── src/
│   ├── app.d.ts                          # Global type declarations
│   ├── app.html                          # SvelteKit HTML template
│   ├── hooks.server.ts                   # Server hooks (auth, etc.)
│   ├── hooks.client.ts                   # Client hooks
│   ├── lib/
│   │   ├── components/                   # Shared components
│   │   │   └── ui/                      # Base UI components
│   │   ├── server/
│   │   │   ├── auth/                    # Lucia auth setup
│   │   │   ├── db/                      # Drizzle ORM setup
│   │   │   └── api/                     # API endpoints
│   │   └── features/                    # Feature modules example
│   │       ├── dashboard/               # Dashboard feature example
│   │       │   ├── components/
│   │       │   │   ├── layout/
│   │       │   │   │   ├── DashboardHeader.svelte
│   │       │   │   │   └── DashboardGrid.svelte
│   │       │   │   ├── stats/
│   │       │   │   ├── quests/
│   │       │   │   ├── games/
│   │       │   │   └── achievements/
│   │       │   ├── stores/
│   │       │   ├── types/
│   │       │   └── utils/
│   │       ├── auth/                    # Auth feature
│   │       └── profile/                 # Profile feature
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +layout.server.ts
│   │   ├── +page.svelte
│   │   └── (dashboard)/                 # Grouped routes
│   └── stories/                         # Storybook stories
├── static/                              # Static assets
├── tests/
│   ├── unit/
│   └── e2e/
├── .env
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── drizzle/
│   └── migrations/
├── [drizzle.config.ts](http://_vscodecontentref_/0)
├── [svelte.config.js](http://_vscodecontentref_/1)
├── tailwind.config.js
├── [tsconfig.json](http://_vscodecontentref_/2)
├── [vite.config.ts](http://_vscodecontentref_/3)
└── [package.json](http://_vscodecontentref_/4)


**Development Guidelines**

Use TypeScript for all files
Follow SvelteKit filesystem routing
Create stories for all shared components
Keep components small and reusable
Use server-side validation
Implement proper error handling

**Authentication Requirements**
Email/password authentication
OAuth providers (Google, GitHub)
Protected routes
Role-based access control

**Database Schema**
Users table
Sessions table

**Additional business logic tables**
Testing
Vitest for unit testing
Playwright for E2E testing
Component testing with Testing Library
