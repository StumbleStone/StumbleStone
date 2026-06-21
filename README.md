# StumbleStone

GitHub Pages profile site for the `StumbleStone` repo.

## Getting started

```sh
nvm use
corepack pnpm install
corepack pnpm serve
```

## Scripts

```sh
corepack pnpm serve
corepack pnpm build
corepack pnpm typecheck
corepack pnpm format
```

## Configuration

- `.nvmrc` pins the Node 24 runtime used by the repo.
- `.env` provides the default GitHub Pages base path and dev server settings.
- `.env.local` can override local settings without being committed.
- `.npmrc` keeps the repo aligned with the other StumbleStone projects.

## Local package links

This repo supports pnpm dependency overrides through `.pnpmfile.cjs` and `.links.json`.

To link a local package:

1. Open `.links.json`.
2. Remove the leading `__` from the package you want to activate.
3. Run `corepack pnpm install` again.

That lets you point dependencies at sibling repos like `../components/packages/components`.
