# ABC Restaurant Backend

This is the backend API for the ABC Restaurant web application, built using Node.js and MySQL. It provides various endpoints to handle restaurant operations such as user registration, reservations, menu management, and more.

## Features

- **User Registration and Authentication**: Create accounts, log in, and manage user sessions.
- **Online Reservations**: Make, modify, and cancel reservations for dine-in or delivery services.
- **Menu Management**: Browse and manage menu items, categories, and prices.
- **Offers Management**: View and manage offers and discounts.
- **Query Management**: Submit and track customer inquiries or feedback.
- **Rates Management**: View and manage rates for different services.
- **Gallery**: Browse photos of restaurant facilities, events, and menu items.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database management system.
- **Sequelize**: Promise-based Node.js ORM for MySQL.
- **dotenv**: Module to load environment variables.

## Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/abc-restaurant-backend.git
    cd abc-restaurant-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file**:

    Create a `.env` file in the root directory and add your database credentials:

    ```plaintext
    DB_HOST=localhost
    DB_NAME=abc_restaurant
    DB_USER=root
    DB_PASSWORD=yourpassword
    PORT=3000
    ```

4. **Run the application**:

    ```bash
    node index.js
    ```

    The server should start on `http://localhost:3000`.

## Database

The application uses MySQL to store data. Ensure that you have MySQL installed and running on your machine. The Sequelize ORM is used to manage database connections and migrations.

## API Endpoints

### Users

- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user and obtain a token.

### Reservations

- `POST /reservations` - Make a reservation.
- `GET /reservations/:id` - Get details of a specific reservation.

### Menu Items

- `GET /menu` - Get a list of all menu items.
- `POST /menu` - Add a new menu item.

*More endpoints are available for offers, queries, rates, and gallery management.*

## License

This project is licensed under the MIT License.
