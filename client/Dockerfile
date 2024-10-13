# Use an official node image as the base
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
