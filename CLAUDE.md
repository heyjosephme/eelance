# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint` (runs `biome check`)
- **Format**: `pnpm format` (runs `biome format --write`)
- **Add UI component**: `pnpm dlx shadcn@latest add <component>`
- **Prisma generate**: `pnpm dlx prisma generate`
- **Prisma migrate**: `pnpm dlx prisma migrate dev`

No test framework is configured yet.

## Architecture

- **Framework**: Next.js 16.2.1 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with CSS variables (oklch colors), dark mode via `.dark` class
- **Components**: shadcn/ui (radix-nova style) with Radix UI primitives, CVA for variants
- **Database**: Prisma ORM with PostgreSQL (schema has no models yet, client outputs to `lib/generated/prisma`)
- **Linting/Formatting**: Biome (not ESLint/Prettier)
- **Package manager**: pnpm

## Key Conventions

- Path alias: `@/*` maps to the project root (e.g., `@/components/ui/button`)
- Utility: `cn()` from `@/lib/utils` for composing Tailwind classes (clsx + tailwind-merge)
- UI components live in `components/ui/` (managed by shadcn)
- Next.js 16 has breaking changes from earlier versions — always consult `node_modules/next/dist/docs/` before using Next.js APIs
