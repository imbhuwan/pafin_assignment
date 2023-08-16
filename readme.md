```markdown
# PAFIN Users CRUD RESTful API

This project implements a RESTful API for user management using TypeScript, Node.js, and PostgreSQL. The API supports CRUD operations (Create, Read, Update, Delete) for a single resource - User. It includes input validation, JWT authentication, and error handling.

## Features

- Create, retrieve, update, and delete user records.
- Input validation for user data.
- JWT authentication for secure API access.

## Getting Started

### Prerequisites

- Node.js (version X or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imbhuwan/pafin_assignment.git
   cd pafin_assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and provide the following variables:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=yourdb
   DB_USER=youruser
   DB_PASSWORD=yourpassword
   JWT_SECRET=yoursecret
   ```

4. Set up your PostgreSQL database with a `Users` table.

5. Run the API:

   ```bash
   npm run build
   npm start
   ```

## Usage

The API endpoints are accessible at `http://localhost:3000/api/users`. You can use tools like Postman or curl to interact with the API.

## API Documentation

### Create a User

**Request:**

```http
POST /api/users
Content-Type: application/json
Authorization : JWT token

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

Check the [`usersController.ts`](controllers/usersController.ts) for other endpoints and request/response examples.

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Replace placeholders such as `yourusername`, `yourdb`, `youruser`, `yourpassword`, and `yoursecret` with your actual values. This complete `README.md` template includes the necessary sections to guide users through setting up, running, and using your API, as well as contributing and understanding its features.