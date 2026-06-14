# MedBridge

Project specification: [MedBridge](https://docs.google.com/document/d/1q4nEy9cO5W0okZOoAOVT-naie12lUwV0ZKGl3D8u4IE/edit?usp=sharing)

## Prerequisites

- [Node.js](https://nodejs.org/) — v22.17.0 recommended
- [pnpm](https://pnpm.io/installation) — v11.6.0 recommended
- [Docker](https://www.docker.com/get-started/) — required for the local Postgres database (`pnpm db:start`)

## Scripts

| Script              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `pnpm dev`          | Start the Next.js development server                     |
| `pnpm build`        | Build the application for production                     |
| `pnpm start`        | Start the production server                              |
| `pnpm lint`         | Run ESLint to check for code issues                      |
| `pnpm format`       | Format all files with Prettier                           |
| `pnpm format:check` | Check formatting without writing changes                 |
| `pnpm typecheck`    | Run TypeScript type checking without emitting files      |
| `pnpm check`        | Run lint, format check, and typecheck together           |
| `pnpm db:start`     | Start the local Postgres database via Docker Compose     |
| `pnpm db:stop`      | Stop the local Postgres database                         |
| `pnpm db:generate`  | Generate Drizzle ORM migration files from schema changes |
| `pnpm db:migrate`   | Apply pending database migrations                        |
| `pnpm db:studio`    | Open Drizzle Studio to browse and edit the database      |

## Getting Started

### Environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

### MCP clients

Copy the example MCP config for your AI client:

- **Cursor**: `cp .agents/mcp.example.json .cursor/mcp.json`
- **Claude Code**: `cp .agents/mcp.example.json .mcp.json`

### Run the development server

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Authentication

Auth is configured with [better-auth](https://www.better-auth.com/) using email magic links. Go to [http://localhost:3000/sign-in](http://localhost:3000/sign-in), enter your email, and submit the form.

In local development, emails are not sent — the magic link is printed in the terminal where `pnpm dev` is running. Look for a line like `[magic-link] to: you@example.com` and open the URL to complete sign-in. New accounts are created automatically on first login.

### Learn the codebase with an agent

If you are new to this repo, use the **codebase-onboarding** skill (`.agents/skills/codebase-onboarding/`) in Cursor or Claude Code. Ask the agent to onboard you — for example:

```
/codebase-onboarding Onboard me to this codebase
```

The skill analyzes the project structure, conventions, and entry points, then produces an onboarding guide and updates `AGENTS.md` with project-specific instructions.

## Agentic Engineering

This project is configured for Agentic Engineering with rules and skills from [affaan-m/ECC](https://github.com/affaan-m/ECC) and [mattpocock/skills](https://github.com/mattpocock/skills).

The source of truth is the `.agents` directory:

- **`.agents/rules/`** — coding standards and project conventions
- **`.agents/skills/`** — reusable agent skills (task-specific instructions)

Symlinks in `.claude/` and `.cursor/` point at `.agents` so Claude Code and Cursor share the same rules and skills:

```
.claude/rules  -> ../.agents/rules
.claude/skills -> ../.agents/skills
.cursor/rules  -> ../.agents/rules
.cursor/skills -> ../.agents/skills
```

Edit files under `.agents`; changes apply to both tools automatically.
