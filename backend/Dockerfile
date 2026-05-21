FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
COPY scripts ./scripts
COPY --from=builder /app/dist ./dist

RUN sed -i 's/\r$//' ./scripts/start-docker.sh
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
