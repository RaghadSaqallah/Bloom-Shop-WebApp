# Technical Notes

## Biggest Docker problem and how I solved it

**Problem:** While containerizing an earlier project that uses the same stack (Tailwind CSS v4 compiled with the CLI), `docker compose build` failed at `RUN npm run build` with:

```
Error: Cannot find native binding.
Cannot find module '@tailwindcss/oxide-linux-x64-gnu'
```

**Causes:**

1. The Dockerfile used `node:18`, but Tailwind CSS v4 requires Node 20 or newer.
2. The Dockerfile deleted `package-lock.json` and ran `npm install`. This triggers a known npm bug with optional dependencies, so the Linux native binary of Tailwind's engine was never installed.
3. The npm scripts pointed to `./css/...` while the source files live in `src/css/`, and the final image copied the whole project folder instead of only the website files.

**Solution (applied in this project from the start):**

- Used `node:22-alpine` as the build stage.
- Kept `package-lock.json` and installed with `npm ci` for a fast, reproducible install.
- Fixed the npm scripts to use `./src/css/...`.
- Used a **multi-stage build**: Node only compiles the CSS, and Nginx serves just the `src/` folder. The final image contains no Node and no `node_modules`.
- Added `node_modules` to `.dockerignore` so Windows-built packages never enter the container.

**Smaller issues I ran into:**

- Docker Desktop failed to start with `ERROR_NO_SYSTEM_RESOURCES` (not enough memory for the WSL virtual machine). Closing heavy programs and restarting Docker Desktop fixed it.
- Port `8080` was already used by an older container from another project (`docker ps` showed it). I stopped the old container before starting this one.

## Most important Git/GitHub lesson

Small commits with clear messages (`feat:`, `docker:`, `ci:`, `docs:`) make the history readable, and working on a feature branch (`feature/docker-setup`) with a Pull Request keeps `main` clean. I also learned that tiny details matter: my README file was accidentally named `README .md` (with a space), so `git add README.md` failed with `pathspec did not match any files` until I renamed it. Adding `.gitignore` before the first commit also kept `node_modules` out of the repository.
