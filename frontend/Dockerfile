# Why: node:20-alpine keeps the image small.
# npm install runs inside the container so host node_modules never pollutes the image.
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
# Install all deps (including devDeps for Vite dev server)
RUN npm install

COPY . .

EXPOSE 5173

# Audit note: --host 0.0.0.0 is required so the Vite dev server
# is reachable from outside the container (Docker port binding).
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
