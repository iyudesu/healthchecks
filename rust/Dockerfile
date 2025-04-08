# Use rust base image
FROM public.ecr.aws/docker/library/rust:1.86-alpine3.20 AS builder

# Set the working directory
WORKDIR /app

# Install libraries
RUN apk add pkgconfig openssl-dev libc-dev

# Copy the entire project
COPY ./healthcheck .

# Build the application
RUN cargo build --release

# Second stage for a smaller image
FROM alpine:3.21.3

# Set the working directory
WORKDIR /app

RUN apk update && apk add openssl ca-certificates

# Copy the built binary from the builder stage, binary name check when test build on local
COPY --from=builder /app/target/release/healthcheck .

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["./healthcheck"]