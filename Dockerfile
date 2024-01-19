FROM --platform=linux/arm64 node:18-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY dist dist
COPY node_modules node_modules
COPY package.json package.json
# COPY prisma prisma

EXPOSE $PORT

# RUN npx prisma generate --schema ./prisma/schema.prisma

CMD [ "node", "dist/main.js" ]