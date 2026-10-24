FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build" AUTH_SECRET="build-placeholder"
RUN npm run build
EXPOSE 3000
CMD ["sh","-c","npx prisma migrate deploy && npm start"]
