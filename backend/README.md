# Doctor Appointment Backend

Backend service for the Doctor Appointment Booking System.

## Features
- **Book Appointments**: Schedule new appointments.
- **Cancel Appointments**: Cancel existing appointments.
- **Reschedule Appointments**: Change the time of an appointment.
- **Concurrency Control**: Prevents double-booking using MongoDB unique indexes.

## Prerequisites
- Node.js (v14+)
- MongoDB

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/clinic
   PORT=5000
   ```

3. **Start Server**
   ```bash
   npm start
   ```

## API Endpoints

### 1. Book Appointment
- **URL**: `/api/appointments`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "doctorId": "507f1f77bcf86cd799439011",
    "startTime": "2024-12-06T10:00:00.000Z",
    "endTime": "2024-12-06T11:00:00.000Z"
  }
  ```

### 2. Cancel Appointment
- **URL**: `/api/appointments/:id/cancel`
- **Method**: `PUT`
- **Payload**: None

### 3. Reschedule Appointment
- **URL**: `/api/appointments/:id/reschedule`
- **Method**: `PUT`
- **Payload**:
  ```json
  {
    "startTime": "2024-12-06T12:00:00.000Z",
    "endTime": "2024-12-06T13:00:00.000Z"
  }
  ```

## Testing

A Postman collection is included: `doctor_appointment_postman_collection.json`. Import it into Postman to test the API.
