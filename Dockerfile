FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code and static files
COPY src/ ./src/
COPY *.html ./
COPY *.txt ./
COPY *.svg ./

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
