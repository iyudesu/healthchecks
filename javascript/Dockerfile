# Install dependencies only when needed
FROM public.ecr.aws/docker/library/node:23.11.0-alpine3.21 AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy config before dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Second image, copy all the files and run next
FROM public.ecr.aws/docker/library/alpine3.21.3 AS runner

# Set the working directory
WORKDIR /app

# Update libraries
RUN apk update

# Copy config
COPY --from=builder /app ./

# Create directory
RUN mkdir /tmp/ready

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["node","app.js"]
