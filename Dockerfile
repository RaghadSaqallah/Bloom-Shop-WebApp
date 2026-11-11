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

CMD ["nginx", "-g", "daemon off;"]