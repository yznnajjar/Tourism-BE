# Postman Collection Setup Guide

## Import Collection

1. **Open Postman**
2. Click **"Import"** button (top left)
3. Select the file: `Tourism_API.postman_collection.json`
4. Click **"Import"**

## Collection Features

### ✅ Pre-configured Variables
- `baseUrl`: http://localhost:3000/api
- `accessToken`: Auto-saved from login/register
- `userId`, `destinationId`, `tourId`, etc.: Auto-saved from responses

### ✅ Auto Authentication
- Collection-level Bearer token authentication
- Token automatically saved after login/register
- All protected endpoints use the token automatically

### ✅ Test Scripts
- Login/Register automatically save the access token
- Create requests automatically save IDs to variables
- Use these IDs in subsequent requests

## Usage Flow

### 1. Start Your Server
```bash
npm run start:dev
```

### 2. Register/Login
1. Run **"Authentication > Register"** or **"Authentication > Login"**
2. Token is automatically saved
3. All subsequent requests will use this token

### 3. Create Resources
1. Create a **Category** (optional)
2. Create a **Destination**
3. Create a **Tour** or **Hotel** (linked to destination)
4. Create a **Booking** (tour or hotel)
5. Create a **Review**
6. Add to **Favorites**

### 4. Test Protected Endpoints
All endpoints in Users, Bookings, Favorites require authentication and will automatically use the saved token.

## Collection Structure

```
Tourism API
├── Health
│   └── Health Check
├── Authentication
│   ├── Register
│   └── Login
├── Users
│   ├── Get Profile
│   ├── Update Profile
│   ├── Change Password
│   ├── Get User by ID
│   └── Get All Users
├── Destinations
│   ├── Get All Destinations
│   ├── Get Destination by ID
│   ├── Create Destination
│   ├── Update Destination
│   └── Delete Destination
├── Tours
│   ├── Get All Tours
│   ├── Get Tour by ID
│   ├── Create Tour
│   ├── Update Tour
│   └── Delete Tour
├── Hotels
│   ├── Get All Hotels
│   ├── Get Hotel by ID
│   ├── Create Hotel
│   ├── Update Hotel
│   └── Delete Hotel
├── Bookings
│   ├── Get All Bookings
│   ├── Get Booking by ID
│   ├── Create Tour Booking
│   ├── Create Hotel Booking
│   ├── Update Booking
│   ├── Cancel Booking
│   └── Delete Booking
├── Reviews
│   ├── Get All Reviews
│   ├── Get Review by ID
│   ├── Create Destination Review
│   ├── Create Tour Review
│   ├── Create Hotel Review
│   ├── Update Review
│   └── Delete Review
├── Categories
│   ├── Get All Categories
│   ├── Get Category by ID
│   ├── Create Category
│   ├── Update Category
│   └── Delete Category
├── Favorites
│   ├── Get All Favorites
│   ├── Add Destination to Favorites
│   ├── Add Tour to Favorites
│   ├── Add Hotel to Favorites
│   ├── Remove Favorite by ID
│   └── Remove Favorite by Item
└── Search
    └── Global Search
```

## Environment Variables

You can create a Postman Environment for different configurations:

### Development Environment
- `baseUrl`: `http://localhost:3000/api`

### Production Environment
- `baseUrl`: `https://your-production-url.com/api`

## Tips

1. **Run requests in order**: Some requests depend on IDs from previous requests
2. **Check variables**: View saved variables in the collection variables tab
3. **Update baseUrl**: Change the `baseUrl` variable if your server runs on a different port
4. **Test scripts**: Check the "Tests" tab to see auto-save scripts
5. **Response examples**: Each request has example request bodies

## Troubleshooting

### Token not saving?
- Check that login/register returns `accessToken` in response
- Verify test scripts are enabled in Postman settings

### Variables not updating?
- Check collection variables are set to "Current Value"
- Manually set variables if needed

### 401 Unauthorized?
- Run Login/Register first
- Check token is saved in collection variables
- Verify Bearer token is set in Authorization tab

