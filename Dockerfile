# Runs this project outside LazyFrog (export).
FROM node:26.11.1-slim AS build
WORKDIR /app
# Node 25+ no longer ships corepack; the same pnpm as .tool-versions.
RUN npm install -g pnpm@12.10.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:26.11.1-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
