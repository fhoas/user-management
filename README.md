## Technologies Used

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend

- **Angular** (v18.2.0)
- **Ng Zorro Ant Design**
- **RxJS**
  

## API Documentation

The backend API is designed to provide all necessary functionalities for the user management system. The API is located in the `api` directory and includes endpoints for user authentication, user management, and other relevant functionalities.


## User Management Application

The frontend user management application is built using Angular. It provides a user-friendly interface for interacting with the backend API.


## Installation

### Clone the repository:

git clone `https://github.com/fhoas/user-management-app`

## Backend Setup

1. Navigate to the api directory:
   `cd api`

2. Install backend dependencies:
   `npm install`

3. Start the backend server:
   `npm run dev`

## Frontend Setup

1. Navigate to the client directory:
   `cd client`

2. Install frontend dependencies:
   `npm install`

3. Start the Angular development server:
   `ng serve`


## Development Server

Navigate to `http://localhost:4200/` in your browser to access the frontend application. The application will automatically reload if you change any of the source files.


### Server Configuration

In your `index.js`, ensure you have the following code to run the server on port 3000:

app.listen(3000, () => {
console.log("Server is running on port 3000!");
});


## Environment Variables

Before running the application, create a `.env` file in the `api` directory with the following content:

`MONGO=mongodb+srv://<username>:<password>@cluster1.kpi3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

`JWT_SECRET=<your_jwt_secret>`

`JWT_EXPIRES_IN=60m`

> **Note:** Ensure to replace `<username>`, `<password>`, and `<your_jwt_secret>` with your actual values.
