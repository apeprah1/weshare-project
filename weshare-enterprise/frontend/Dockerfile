# -----------------------
# Stage 1: Build Vite frontend
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build


# -----------------------
# Stage 2: Serve with Nginx
# -----------------------
FROM nginx:stable-alpine

# Copy secure nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Read-only FS for security (optional)
# USER nginx

CMD ["nginx", "-g", "daemon off;"]
