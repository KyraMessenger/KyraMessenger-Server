### API Documentation

#### **Authentication**

---

#### 1. **Login**

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticate a user with email/username and password.
- **Request Body:**
  ```json
  {
    "emailOrUsername": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `200 OK`: Returns a JWT token.
  ```json
  {
    "token": "string"
  }
  ```
  - `400 Bad Request`: Invalid email/username or password.

#### 2. **Register**

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Register a new user with email, username, and password.
- **Request Body:**
  ```json
  {
    "email": "string",
    "username": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `200 OK`: User registered successfully.
  ```json
  {
    "message": "Success register user"
  }
  ```
  - `400 Bad Request`: Error in registration (e.g., missing fields, email already in use).

---

#### **User Management**

---

#### 3. **Find User by ID**

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Description:** Fetch user data by user ID.
- **URL Parameters:**
  - `id`: User ID.
- **Responses:**
  - `200 OK`: Returns the user data (excluding password) along with the profile.
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "Profile": {
      "fullName": "string",
      "profilePicture": "string"
    }
  }
  ```
  - `404 Not Found`: User not found.

#### 4. **Find Logged-In User**

- **Endpoint:** `/users/me`
- **Method:** `GET`
- **Description:** Get the details of the currently logged-in user.
- **Responses:**
  - `200 OK`: Returns the logged-in user’s details (excluding password) along with the profile.
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "Profile": {
      "fullName": "string",
      "profilePicture": "string"
    }
  }
  ```
  - `404 Not Found`: User not found.

#### 5. **Find All Users (Excluding Logged-In User)**

- **Endpoint:** `/users`
- **Method:** `GET`
- **Description:** Retrieve a list of all users, excluding the currently logged-in user.
- **Responses:**
  - `200 OK`: Returns an array of users (excluding password) and their profiles.
  ```json
  [
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "Profile": {
        "fullName": "string",
        "profilePicture": "string"
      }
    },
    ...
  ]
  ```

---

#### **Profile Management**

---

#### 6. **Edit Profile**

- **Endpoint:** `/profile`
- **Method:** `PUT`
- **Description:** Edit the profile of the logged-in user.
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "profilePicture": "string"
  }
  ```
- **Responses:**
  - `200 OK`: Profile has been successfully updated.
  ```json
  {
    "message": "Profile has been updated"
  }
  ```
  - `404 Not Found`: Profile not found.
  - `403 Forbidden`: Unauthorized user access.

---

#### **Messaging**

---

#### 7. **Get Messages**

- **Endpoint:** `/message`
- **Method:** `GET`
- **Description:** Fetch all messages along with user and profile data.
- **Responses:**
  - `200 OK`: Returns an array of messages with associated user and profile details.
  ```json
  [
    {
      "message": "string",
      "User": {
        "id": "integer",
        "username": "string",
        "Profile": {
          "fullName": "string",
          "profilePicture": "string"
        }
      }
    },
    ...
  ]
  ```

---

### Error Responses

- `400 Bad Request`: Missing or invalid data.
- `401 Unauthorized`: Invalid credentials or token.
- `403 Forbidden`: User is not allowed to perform the requested action.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.
