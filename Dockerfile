# ---------- Stage 1: build Tailwind CSS ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and compile the CSS
COPY . .
RUN npm run build

# ---------- Stage 2: serve static files ----------
FROM nginx:alpine
COPY --from=builder /app/src /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]