# Tourism Mobile App Backend API

A comprehensive NestJS backend API for a Tourism mobile application.

## Features

- User Authentication (JWT)
- Destinations Management
- Tours & Activities
- Hotels & Accommodations
- Bookings System
- Reviews & Ratings
- Categories
- Favorites/Wishlist
- Search Functionality

## Installation

```bash
npm install
```

## Setup

1. Copy `.env.example` to `.env` and configure your database and JWT secret
2. Make sure PostgreSQL is running
3. Run migrations (if using TypeORM migrations)

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

Once the server is running, visit `http://localhost:3000/api` for Swagger documentation.

## Project Structure

```
src/
├── auth/              # Authentication module
├── users/             # User management
├── destinations/      # Destinations module
├── tours/             # Tours & Activities module
├── hotels/            # Hotels & Accommodations module
├── bookings/          # Bookings module
├── reviews/           # Reviews & Ratings module
├── categories/        # Categories module
├── favorites/         # Favorites/Wishlist module
├── search/            # Search module
├── common/            # Common utilities, guards, decorators
├── config/            # Configuration files
└── database/          # Database entities and configuration
```

