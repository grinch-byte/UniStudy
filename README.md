# UniStudy — Project Documentation

## 1. Project Overview

UniStudy is a full-stack university collaboration platform designed to help students and lecturers connect, create study groups, schedule learning sessions, and share knowledge.

The platform provides a centralized environment for collaborative academic work.

---

## 2. Objectives

The system aims to:

* Allow users to register and access the platform
* Support student and lecturer roles
* Enable creation and joining of study groups
* Allow scheduling of study sessions
* Create a collaborative learning environment
* Build a foundation for future real-time communication

---

## 3. System Architecture

### Frontend

Technology:

* React
* Vite
* JavaScript
* React Router

Responsibilities:

* User interface
* Navigation
* Form handling
* API communication

---

### Backend

Technology:

* Node.js
* Express.js
* Nodemon

Responsibilities:

* Handle API requests
* User registration
* Data validation
* Business logic

---

## 4. Project Structure

UniStudy/

frontend/

* src/

  * components/

    * Navbar.jsx
  * pages/

    * Dashboard.jsx
    * Login.jsx
    * Register.jsx
    * Groups.jsx
    * Sessions.jsx
    * Profile.jsx
  * App.jsx

backend/

* src/

  * routes/
  * controllers/
  * server.js

---

## 5. Features

### User Registration

Users can:

* Enter first name
* Enter last name
* Enter email
* Select academic program
* Select role
* Create password

API:

POST

/auth/register

Response:

{
"message":"Account created"
}

---

### Login

Users authenticate to access protected pages.

Current status:
UI prepared.

Future:
Backend authentication.

---

### Dashboard

Displays:

* Upcoming Sessions
* Joined Groups
* Knowledge Highlights

---

### Groups

Allows users to:

* View study groups
* Join groups
* Create groups

Current status:
Frontend available.

---

### Sessions

Allows users to:

* View sessions
* Create sessions
* Track meetings

Current status:
Frontend available.

---

### Profile

Stores:

* User information
* Program
* Role

---

## 6. API Documentation

### Register User

Endpoint:

POST /auth/register

Request:

{
"firstName":"John",
"lastName":"Doe",
"email":"[john@uni.edu](mailto:john@uni.edu)",
"program":"IT",
"role":"Student",
"password":"password123"
}

Response:

{
"message":"Account created"
}

---

### Get Users

Endpoint:

GET /auth/users

Response:

[
{
"firstName":"John"
}
]

---

## 7. Application Flow

Register
↓

Login
↓

Dashboard
↓

Groups / Sessions
↓

Profile

---

## 8. Testing

Testing performed:

✔ Registration form

✔ Backend connection

✔ API response

✔ Frontend rendering

✔ Duplicate registration handling

---

## 9. Challenges Encountered

* Node version compatibility
* Package installation issues
* React component export errors
* Vite compilation errors
* Frontend-backend integration

Solutions:

* Reinstalled dependencies
* Corrected component exports
* Fixed routing
* Verified API endpoints

---

## 10. Future Improvements

* Database integration (SQLite / MongoDB)
* JWT Authentication
* Real-time study rooms
* Notifications
* Search and filtering
* Dark mode
* Deployment

---

## 11. Conclusion

UniStudy demonstrates a modern full-stack web application architecture using React and Express.

The project establishes a foundation for collaborative university learning and can be expanded into a production-ready educational platform.
