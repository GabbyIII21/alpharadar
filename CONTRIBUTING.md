# Contributing

## Development Workflow

1. Install dependencies with `npm install`.
2. Start the local app with `npm run dev`.
3. Keep changes scoped to the feature or fix being worked on.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build` before opening a pull request.

## Code Style

- Use TypeScript for all application code.
- Prefer existing components and service boundaries before creating new abstractions.
- Keep reusable UI in `src/components`.
- Keep data contracts in `src/types`.
- Keep API access behind `src/services`.
- Use Tailwind utility classes and existing design tokens.

## Commit Guidance

- Write concise imperative commit messages.
- Do not add co-authors unless a human contributor explicitly requests attribution.
- Avoid unrelated formatting churn.

## Pull Request Checklist

- The app builds successfully.
- TypeScript passes.
- Lint passes.
- New UI is responsive on mobile and desktop.
- Mock data remains realistic and demo-ready.
