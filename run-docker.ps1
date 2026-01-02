# Start a new PostgreSQL container with the setup.sql script
docker run --name my_postgres `
  -e POSTGRES_USER=admin `
  -e POSTGRES_PASSWORD=admin `
  -e POSTGRES_DB=mydb `
  -v C:\git\pgall\database:/docker-entrypoint-initdb.d `
  -p 5432:5432 `
  -d postgres:latest