# GITHUB-REPO-EXPLORER

GitHub Repo Explorer is a Node.js application that interacts with GitHub APIs to search for repositories, allowing reading a file from specific repository and manage favorites.
This api is using mongodb atlas. The favorites are managed in 

## Database

This project uses MongoDB Atlas as its primary database to manage favorites.

### Setting Up MongoDB Atlas

1. Create an account on MongoDB Atlas (https://www.mongodb.com/cloud/atlas/register).
2. Setup a new cluster.
3. Obtain the connection string for your application.
4. Copy the connection string to `.env` file

MONGODB_CONNECTION_STRING=your_connection_string_here

Note: Replace 'your_connection_string_here' with the actual connection string.


## Setting Up

1. Install dependencies:

        npm install


2. Configure environment variables:

    Update `.env` and fill in the necessary details along with github CLIENT_ID and CLIENT_SECRET for OAuth. Sample `.env.example` is attached for reference.


3. Start the server:

        npm run dev


## Routes

- **General Routes**: Redirects users to API documentation.
- **Authentication Routes**: Handles GitHub OAuth authentication.
- **Favorites Routes**: Manages user's favorite repositories.
- **Repository Routes**: Searches for repositories and fetches file contents from specific repositories.

## API Documentation

The API documentation is available at `/api-doc`.

## Testing

1. Auth Controller Tests: `authController.test.ts`
2. Favorites Controller Tests: `favoritesController.test.ts`

Run tests with:

        npm test


## Dockerize It

Create docker build:

        docker build -t github-repo-explorer .

Run docker container:

        docker run -p 3000:3000 github-repo-explorer
Note: Feel free to change port(s) as required.


## Controllers

- **authController**: Manages GitHub authentication.
- **favoritesController**: Manages CRUD operations for favorites.
- **reposController**: Searches for repositories and fetches file contents.

## Models

- **Favorite**: Represents a favorite GitHub repository with properties such as `githubId`, `repositoryName`, `language`, `createdDate`, and `description`.
