
# Game Vibes

## Overview
A RESTful API built with Express.js that provides game recommendations based on your mood and the current hour. The API fetches data from the **Free To Game** API to give personalized game suggestions based on the user's emotional state and the time of day.

## Project Structure

```
src/
├── controller/     # Route handlers and business logic  
├── middleware/     # Authentication and validation middleware  
├── model/          # Data models and business logic  
├── service/        # API integration and logic  
├── routes/         # API route definitions  
└── db/             # Database configuration and connection  
```

## API Endpoints

### 1. Game Recommendations
#### POST /recommendations
- Provides game recommendations based on the user's mood and the current hour.
- **Authentication**: No authentication required.
- Request body:
```json
{
  "mood": "happy",
  "hour": "14"
}
```
- The API will respond with a list of recommended games based on the provided mood and hour.

### Example Response:
```json
[
  {
    "title": "Game Title 1",
    "genre": "Action",
    "short_description": "Short description of the game."
  },
  {
    "title": "Game Title 2",
    "genre": "Adventure",
    "short_description": "Short description of the game."
  }
]
```

## Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Integration**: Axios for fetching recommendations from Free To Game API
- **Architecture**: MVC Pattern

## Security Implementation
- No authentication is required to fetch game recommendations, but proper validation of incoming requests is implemented.

## Middleware
1. **validatorApi**: Validates the required fields (`mood` and `hour`) in the request.

## Error Handling
All endpoints include standardized error responses:
```json
{
  "message": "Error message",
  "error": {
    "message": "Detailed error description"
  }
}
```

Status codes:
- 200: Successful operation
- 400: Bad request or validation error
- 404: No games found with the given criteria
- 500: Internal server error

## Setup Requirements
1. Node.js (v14 or higher)
2. NPM or Yarn
3. Environment variables configuration

## Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm start
```

## Environment Variables
```env
DATABASE_URL=your_database_url
```

## Dependencies
```json
{
  "dependencies": {
    "express": "^4.17.1",
    "axios": "^0.21.1"
  }
}
```

## API Response Format
Successful responses:
```json
{
  "title": "Game Title",
  "genre": "Game Genre",
  "short_description": "Short description of the game."
}
```

Error responses:
```json
{
  "message": "Error message",
  "missingFields": ["field1", "field2"]  // For validation errors
}
```

## Development
- Follow the Express.js best practices.
- Use async/await for asynchronous operations.
- Implement proper error handling.
- Validate all incoming requests.
- Use middleware for common operations.

## Contributing
1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a new Pull Request.
