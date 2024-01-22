# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

# Define environment variable
ENV ENDPOINT=http://0.0.0.0:9000/api

# Run npm start when the container launches
CMD ["npm", "start"]
