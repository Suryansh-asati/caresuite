# Local Setup Instructions

Commands explicitly catered to Ubuntu and UNIX-based systems.

## Prerequisites
Ensure modern variables are configured appropriately inside a `.env` file at the root.

Variables:
```sh
DB_URI="mongodb+srv://..."
JWT_SECRET="supersecret_dev_key"
HEROKU_API_KEY="optional_for_actions"
```

## Frontend Setup
```sh
# Initializes a fresh app inside the sub-directory
npx create-react-app caresuite-frontend
cd caresuite-frontend

# Install standard dependencies
npm install react-router-dom axios tailwindcss

# Start the frontend dev server (default port 3000)
npm start

# Run a static build for production targets
npm run build
```

## Backend Setup
```sh
# Set up a new nested application layer
mkdir caresuite-backend
cd caresuite-backend

# Initialize Node modules
npm init -y
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
npm install --save-dev nodemon

# Start the development server (Assuming entry is server.js)
npm run start
```