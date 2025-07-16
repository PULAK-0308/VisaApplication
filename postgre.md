Steps to Implement API Request Logging in PostgreSQL
1. Create a PostgreSQL table
Set up a table named api_logs with the following columns:
id (primary key),
endpoint (text),
method (text),
timestamp (default: NOW()),
user_id (optional: can be NULL)

2. Install PostgreSQL client
Use the pg npm package to connect to your PostgreSQL database.

3. Create a middleware
Build a middleware that:
a)Extracts the request method (req.method)
b)Gets the endpoint (req.originalUrl)
c)Gets the user ID from req.userId (set by JWT middleware, if authenticated)
d)Inserts these values into the api_logs table

4. Apply the middleware to routes
Add the middleware after the JWT auth middleware (if protected) and before your controller/handler functions.

5. Handle errors gracefully
Even if PostgreSQL insert fails, the middleware should call next() to avoid blocking the request.

6. Add POSTGRES_URI to .env
Store your PostgreSQL connection string in .env and use dotenv to load it.
