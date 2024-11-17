# JWT Refresh Example

This project demonstrates an example of JWT (JSON Web Token) exchange with a backend server, including a refresh mechanism. The refresh token is passed in an HTTP-only cookie by the server. Once the access token becomes obsolete, the application automatically uses the refresh token with Axios interceptors to obtain a new access token.

## Features

- JWT authentication
- Access token and refresh token handling
- Automatic token refresh using Axios interceptors
- Secure HTTP-only cookies for refresh tokens

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/jwt-refresh-example.git
   cd jwt-refresh-example
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   npm run server
   ```

2. Start the frontend application:

   ```bash
   npm start
   ```

### Usage

1. Register a new user or log in with existing credentials.
2. The server will issue an access token and a refresh token (stored in an HTTP-only cookie).
3. The access token is used for authenticated requests.
4. When the access token expires, Axios interceptors will automatically use the refresh token to obtain a new access token.

## Project Structure

- `src/`: Contains the source code for the frontend application.
- `server/`: Contains the source code for the backend server.
- `public/`: Contains static assets.

## Axios Interceptors

The Axios interceptors are set up to handle token refresh automatically. When an API request fails due to an expired access token, the interceptor will use the refresh token to get a new access token and retry the original request.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Axios](https://github.com/axios/axios)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
