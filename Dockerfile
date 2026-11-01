FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV BASE_DOMAIN=fastpage.my
ENV CONTACT_WHATSAPP=201550612361

COPY package.json ./
COPY src ./src
COPY public ./public
COPY data ./data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3000}/health || exit 1

CMD ["node", "src/server.js"]
