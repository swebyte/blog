# Use a lightweight base image with PostgREST pre-installed
FROM postgrest/postgrest:latest

# Set the working directory
WORKDIR /app

# Copy the PostgREST configuration file into the container
COPY backend/postgrest.conf /app/postgrest.conf

# Expose the port specified in the PostgREST configuration
EXPOSE 3000

# Command to run PostgREST with the configuration file
CMD ["/bin/postgrest", "/app/postgrest.conf"]