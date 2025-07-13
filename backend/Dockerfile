# 1. Use Node 22 base image (official image)
FROM node:22

# 2. Set working directory in container
WORKDIR /app

# 3. Copy only package files first (to leverage Docker cache for deps)
COPY package*.json ./

# 4. Install backend dependencies
RUN npm install

# 5. Copy everything else into the container
COPY . .

# 6. Expose the backend port (change if you're using something else)
EXPOSE 5000

# 7. Run your backend app
CMD ["node", "server.js"]
