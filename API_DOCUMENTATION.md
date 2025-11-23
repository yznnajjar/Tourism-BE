# Tourism API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /auth/register` - Register a new user (Public)
- `POST /auth/login` - Login user (Public)

### Users (`/api/users`)
- `GET /users/profile` - Get current user profile (Protected)
- `PUT /users/profile` - Update current user profile (Protected)
- `PUT /users/change-password` - Change user password (Protected)
- `GET /users/:id` - Get user by ID (Protected)
- `GET /users` - Get all users (Protected)

### Destinations (`/api/destinations`)
- `GET /destinations` - Get all destinations (Public)
  - Query params: `search`, `categoryId`, `limit`, `offset`
- `GET /destinations/:id` - Get destination by ID (Public)
- `POST /destinations` - Create destination (Protected)
- `PATCH /destinations/:id` - Update destination (Protected)
- `DELETE /destinations/:id` - Delete destination (Protected)

### Tours (`/api/tours`)
- `GET /tours` - Get all tours (Public)
  - Query params: `search`, `destinationId`, `categoryId`, `limit`, `offset`
- `GET /tours/:id` - Get tour by ID (Public)
- `POST /tours` - Create tour (Protected)
- `PATCH /tours/:id` - Update tour (Protected)
- `DELETE /tours/:id` - Delete tour (Protected)

### Hotels (`/api/hotels`)
- `GET /hotels` - Get all hotels (Public)
  - Query params: `search`, `destinationId`, `limit`, `offset`
- `GET /hotels/:id` - Get hotel by ID (Public)
- `POST /hotels` - Create hotel (Protected)
- `PATCH /hotels/:id` - Update hotel (Protected)
- `DELETE /hotels/:id` - Delete hotel (Protected)

### Bookings (`/api/bookings`)
- `POST /bookings` - Create a new booking (Protected)
- `GET /bookings` - Get all bookings for current user (Protected)
- `GET /bookings/:id` - Get booking by ID (Protected)
- `PATCH /bookings/:id` - Update booking (Protected)
- `PATCH /bookings/:id/cancel` - Cancel booking (Protected)
- `DELETE /bookings/:id` - Delete booking (Protected)

### Reviews (`/api/reviews`)
- `POST /reviews` - Create a new review (Protected)
- `GET /reviews` - Get all reviews (Public)
  - Query params: `destinationId`, `tourId`, `hotelId`, `limit`, `offset`
- `GET /reviews/:id` - Get review by ID (Public)
- `PATCH /reviews/:id` - Update review (Protected)
- `DELETE /reviews/:id` - Delete review (Protected)

### Categories (`/api/categories`)
- `GET /categories` - Get all categories (Public)
- `GET /categories/:id` - Get category by ID (Public)
- `POST /categories` - Create category (Protected)
- `PATCH /categories/:id` - Update category (Protected)
- `DELETE /categories/:id` - Delete category (Protected)

### Favorites (`/api/favorites`)
- `POST /favorites` - Add item to favorites (Protected)
- `GET /favorites` - Get all favorites for current user (Protected)
  - Query params: `type` (destination, tour, hotel)
- `DELETE /favorites/:id` - Remove favorite by ID (Protected)
- `DELETE /favorites/item/:type/:itemId` - Remove favorite by item (Protected)

### Search (`/api/search`)
- `GET /search` - Global search across destinations, tours, and hotels (Public)
  - Query params: `q` (required), `limit`

## Data Models

### User
- id (UUID)
- email (string, unique)
- password (string, hashed)
- firstName (string)
- lastName (string)
- phone (string, optional)
- avatar (string, optional)
- role (enum: user, admin)
- isActive (boolean)

### Destination
- id (UUID)
- name (string)
- description (text)
- location (string)
- latitude (decimal, optional)
- longitude (decimal, optional)
- images (array of strings)
- thumbnail (string, optional)
- rating (decimal, 0-5)
- reviewCount (number)
- categories (many-to-many with Category)

### Tour
- id (UUID)
- name (string)
- description (text)
- price (decimal)
- duration (string, optional)
- images (array of strings)
- thumbnail (string, optional)
- rating (decimal, 0-5)
- reviewCount (number)
- maxParticipants (number)
- meetingPoint (string, optional)
- included (array of strings)
- excluded (array of strings)
- destinationId (UUID, foreign key)
- categories (many-to-many with Category)

### Hotel
- id (UUID)
- name (string)
- description (text)
- pricePerNight (decimal)
- type (enum: hotel, resort, villa, apartment, hostel)
- address (string)
- latitude (decimal, optional)
- longitude (decimal, optional)
- images (array of strings)
- thumbnail (string, optional)
- rating (decimal, 0-5)
- reviewCount (number)
- totalRooms (number)
- amenities (array of strings)
- checkInTime (string, optional)
- checkOutTime (string, optional)
- destinationId (UUID, foreign key)

### Booking
- id (UUID)
- type (enum: tour, hotel)
- status (enum: pending, confirmed, cancelled, completed)
- totalAmount (decimal)
- numberOfGuests (number, optional)
- checkInDate (date, optional)
- checkOutDate (date, optional)
- tourDate (date, optional)
- specialRequests (string, optional)
- userId (UUID, foreign key)
- tourId (UUID, foreign key, optional)
- hotelId (UUID, foreign key, optional)

### Review
- id (UUID)
- rating (decimal, 1-5)
- comment (text, optional)
- userId (UUID, foreign key)
- destinationId (UUID, foreign key, optional)
- tourId (UUID, foreign key, optional)
- hotelId (UUID, foreign key, optional)

### Category
- id (UUID)
- name (string, unique)
- description (text, optional)
- icon (string, optional)
- image (string, optional)

### Favorite
- id (UUID)
- type (enum: destination, tour, hotel)
- userId (UUID, foreign key)
- destinationId (UUID, foreign key, optional)
- tourId (UUID, foreign key, optional)
- hotelId (UUID, foreign key, optional)

## Swagger Documentation

Once the server is running, visit:
```
http://localhost:3000/api
```

This will show the interactive Swagger documentation with all endpoints, request/response schemas, and the ability to test APIs directly.

