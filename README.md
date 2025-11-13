# React + TypeScript + Vite — CI/CD, Tests, and Best Practices

## Table of Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [TypeScript](#typescript)
- [Commit Conventions and Git Hooks](#commit-conventions-and-git-hooks)
- [CI (GitHub Actions)](#ci-github-actions)
- [CD (GitHub Pages)](#cd-github-pages)
- [Dependabot](#dependabot)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

This project showcases a professional setup for a Vite + React + TypeScript application, highlighting unit/integration testing, E2E testing, strict linting and typing, commit conventions, and automated CI/CD.

## Highlights

- Strict TypeScript with enhanced safety options
- ESLint with TypeScript, React hooks, Hot Refresh, and accessibility rules
- Prettier formatting integrated with lint-staged and Husky pre-commit hooks
- Conventional Commits enforced via Commitlint
- Vitest + React Testing Library for unit/integration tests with coverage
- Playwright for E2E tests using the production preview server
- GitHub Actions: CI pipeline (lint, typecheck, unit tests + coverage, build, E2E)
- GitHub Pages deployment with correct base path
- Dependabot for weekly npm dependency updates

## Tech Stack

- `React` + `Vite` + `TypeScript`
- `ESLint` (`@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-jsx-a11y`)
- `Prettier`
- `Vitest`, `@testing-library/react`, `@testing-library/jest-dom`
- `Playwright`
- `Husky` + `lint-staged` + `Commitlint`
- `GitHub Actions` + `GitHub Pages`

## Getting Started

Prerequisites:

- Node.js `>=20` and npm

Install dependencies:

```
npm install
```

Husky hooks are installed automatically through the `prepare` script. If needed, run:

```
npm run prepare
```

Start development server:

```
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript build graph then Vite production build
- `npm run preview` — serve `dist` on `http://localhost:4173`
- `npm run lint` — run ESLint across the repo
- `npm run lint:fix` — auto-fix ESLint issues
- `npm run typecheck` — strict type checking for app and node configs
- `npm run format` / `npm run format:check` — Prettier write/check
- `npm run test` — run Vitest unit/integration tests
- `npm run test:coverage` — Vitest with coverage (text, html, lcov)
- `npm run test:e2e` — build and run Playwright E2E tests

## Testing

Unit/Integration (Vitest + Testing Library):

```
npm run test
npm run test:coverage
```

- Vitest configuration lives in `vitest.config.ts` with jsdom environment, setup file, coverage reporters, and exclusions.
- Extended matchers from `@testing-library/jest-dom` are registered in `src/test/setup.ts`.
- Example tests:
  - `src/App.test.tsx` — renders title and verifies counter interaction
  - `src/main.test.tsx` — loads the app entry and checks the heading appears

E2E (Playwright):

```
npx playwright install
npm run test:e2e
```

- `playwright.config.ts` starts `vite preview` against the built `dist`, ensuring tests run against the production build.
- Example spec: `tests/e2e/app.spec.ts` — validates title and counter increment.

## Linting and Formatting

- ESLint configuration is in `eslint.config.js` with TypeScript, React Hooks, Refresh, and a11y rules. Prettier compatibility is enabled to avoid stylistic conflicts.
- Prettier configuration is in `prettier.config.cjs`.
- `lint-staged` configuration is in `.lintstagedrc.json` to fix and format staged files on commit.

## TypeScript

- Strict mode is enabled with additional safety options like `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` in `tsconfig.app.json` and `tsconfig.node.json`.
- Vitest globals are available through `types: ["vite/client", "vitest/globals"]` in `tsconfig.app.json`.

## Commit Conventions and Git Hooks

- Conventional Commits enforced with Commitlint (`commitlint.config.cjs`). Examples:
  - `feat: add counter test`
  - `fix: correct accessibility alt text`
- Husky hooks:
  - `.husky/pre-commit` runs `lint-staged` to fix/format staged files
  - `.husky/commit-msg` validates commit messages

## CI (GitHub Actions)

Workflow file: `.github/workflows/ci.yml`

- Triggers on `push` and `pull_request` to `main`/`master`
- Steps:
  - Checkout and setup Node with npm cache
  - Install dependencies via `npm ci`
  - Run `lint` and `typecheck`
  - Run unit/integration tests with coverage
  - Build the project
  - Install Playwright browsers and run E2E tests
  - Upload coverage artifact

## CD (GitHub Pages)

Workflow file: `.github/workflows/deploy.yml`

- On push to `main`/`master`, builds with `--base=/<repository-name>/` to support GitHub Pages routing
- Publishes `dist` via `actions/deploy-pages`
- After enabling Pages (Settings → Pages → Source: "GitHub Actions"), the deployment URL appears in the `deploy` job output

## CI/CD Operations

- Open a PR: create a feature branch, push, and open a PR to `main` with a Conventional Commit title (e.g., `chore: set up tests, CI/CD, commit hooks`).
- Checks on PR: CI (lint, typecheck, unit/coverage, build, E2E), Commitlint (commit messages), Semantic PR (PR title).
- Merge policy: use “Squash and merge” to keep a linear history; the final commit uses the PR title.
- Post-merge: delete the feature branch locally and on remote.

## GitHub Actions Settings

- Actions permissions: select `Allow all actions and reusable workflows`.
- Workflow permissions: set default `Read and write permissions` so deploy can publish Pages.
- Fork pull requests: require approval for first-time contributors (recommended for public repos).

## Branch Protection (Recommended)

- Settings → Branches → Add rule for `main`.
- Require a pull request before merging.
- Require approvals: 1.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution before merging.
- Require status checks to pass before merging:
  - Required checks: `commitlint`, `build-and-test (20)`, `validate-title`.
- Require branches to be up to date before merging.
- Require linear history.
- Do not allow bypassing the above settings; include administrators.
- Disallow force pushes and deletions on `main`.


Note: For solo‑maintained repositories, set approvals to `0` while keeping required status checks, up‑to‑date branches, conversation resolution, and linear history.
=======


## Pages Deployment — Step‑by‑Step

- Enable Pages: Settings → Pages → Source: GitHub Actions.
- Trigger deploy: merge to `main` or re‑run the “Deploy to GitHub Pages” workflow.
- Find URL: open Actions → last “Deploy to GitHub Pages” run → `page_url` in the `deploy` job.
- Validate site: title “Vite + React”, counter button increments, assets load under `/<repository>/`.

## Re‑run and Trigger

- Re‑run deploy: Actions → “Deploy to GitHub Pages” → Re‑run jobs.
- Manual trigger: push to `main` (e.g., empty commit) to start a fresh deploy:

```
git checkout main
git pull
git commit --allow-empty -m "chore: trigger pages deploy"
git push
```

## Local Cleanup and Sync

- If `git pull` aborts due to untracked `coverage/` or `test-results/`, remove local artifacts:

```
# PowerShell
Remove-Item -Recurse -Force .\coverage
Remove-Item -Recurse -Force .\test-results

# or with Git
git clean -fd coverage test-results
git pull
```

- To stop tracking generated artifacts already in the repo:

```
git checkout -b chore/remove-generated-artifacts
git rm -r --cached coverage test-results
git commit -m "chore: remove generated artifacts from repo"
git push -u origin chore/remove-generated-artifacts
# open PR and merge
```

## Badges (Optional)

- Build status:

```
[![CI](https://github.com/casaislabs/React-CI-CD/actions/workflows/ci.yml/badge.svg)](https://github.com/casaislabs/React-CI-CD/actions/workflows/ci.yml)
```

- Deploy status:

```
[![Deploy](https://github.com/casaislabs/React-CI-CD/actions/workflows/deploy.yml/badge.svg)](https://github.com/casaislabs/React-CI-CD/actions/workflows/deploy.yml)
```

- Live demo:

```
[Live Demo](https://casaislabs.github.io/React-CI-CD/)
```

## Dependabot

- `.github/dependabot.yml` updates npm dependencies weekly, opening PRs automatically.

## Project Structure

```
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ App.test.tsx
│  ├─ main.test.tsx
│  └─ test/setup.ts
├─ tests/
│  └─ e2e/app.spec.ts
├─ eslint.config.js
├─ vitest.config.ts
├─ playwright.config.ts
├─ prettier.config.cjs
├─ .lintstagedrc.json
├─ .husky/
│  ├─ pre-commit
│  └─ commit-msg
└─ .github/workflows/
   ├─ ci.yml
   └─ deploy.yml
```

## Troubleshooting

- Vitest runs E2E tests unexpectedly: ensure `vitest.config.ts` excludes `tests/e2e/**`.
- Missing `test` globals: ensure `types: ["vitest/globals"]` in `tsconfig.app.json` and import `test`/`expect` from `vitest` where needed.
- Playwright browsers not installed: run `npx playwright install` once locally and ensure the CI step `Install Playwright browsers` is present.
- Git commit blocked: check Conventional Commit format and ESLint/Prettier errors fixed by `lint-staged`.

## License

See `LICENSE` for license information.
