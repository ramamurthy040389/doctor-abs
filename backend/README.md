# Doctor Appointment Backend

Backend service for the Doctor Appointment Booking System.

## Features
- **Authentication**: JWT-based auth (Register, Login, Get Me).
- **Doctor Management**: Create/Update profiles, list doctors.
- **Appointment Management**: Book, cancel, and reschedule appointments.
- **Concurrency Control**: Prevents double-booking.

## Prerequisites
- Node.js (v14+)
- MongoDB

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/clinic
   PORT=5000
   JWT_SECRET=your_secret
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   ```

3. **Start Server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

#### 1. Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient" // or "doctor"
  }
  ```

#### 2. Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### 3. Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

---

### Doctors

#### 1. Create/Update Profile (Doctor Only)
- **URL**: `/api/doctors`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Payload**:
  ```json
  {
    "specialization": "Cardiology",
    "experience": 10,
    "qualifications": ["MBBS", "MD"],
    "bio": "Expert Cardiologist",
    "fees": 500,
    "availableSlots": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }
  ```

#### 2. Get All Doctors
- **URL**: `/api/doctors`
- **Method**: `GET`

#### 3. Get Doctor by ID
- **URL**: `/api/doctors/:id`
- **Method**: `GET`

---

### Appointments

#### 1. Book Appointment
- **URL**: `/api/appointments`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Payload**:
  ```json
  {
    "doctorId": "507f1f77bcf86cd799439011",
    "startTime": "2024-12-06T10:00:00.000Z",
    "endTime": "2024-12-06T11:00:00.000Z"
  }
  ```

#### 2. Cancel Appointment
- **URL**: `/api/appointments/:id/cancel`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`

#### 3. Reschedule Appointment
- **URL**: `/api/appointments/:id/reschedule`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Payload**:
  ```json
  {
    "startTime": "2024-12-06T12:00:00.000Z",
    "endTime": "2024-12-06T13:00:00.000Z"
  }
  ```

## Testing

Import `doctor_appointment_postman_collection.json` into Postman to test all APIs.
