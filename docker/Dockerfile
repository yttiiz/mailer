# Dockerfile
FROM denoland/deno:latest
EXPOSE 3000

WORKDIR /app

# Create and set permissions for deno cache directory and working directory
USER root
RUN mkdir -p /deno-dir && chown -R deno:deno /deno-dir && chown -R deno:deno /app
USER deno

# Copy import map first
COPY deno.json .

COPY deps/deps.ts deps/
RUN deno cache deps/deps.ts

COPY . .

RUN deno cache main.ts

ENV HOST=127.0.0.1
ENV PORT=3000