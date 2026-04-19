FROM  node:25-slim AS build

RUN npm install -g pnpm@latest

WORKDIR /app
COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./tsup.config.ts .
COPY ./src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM  node:25-slim AS artifact
WORKDIR /app
COPY --from=build /app/dist/md2notion.js md2notion.js
USER node
CMD ["node", "md2notion.js"]

