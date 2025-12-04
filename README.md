# doctor-abs
This is a doctor appointment booking system time sheet management real time notification, report generate based on select doctor or all doctors 

node src/server.js



🚀 API Route List (Ready for Postman)
🟦 1. AUTH ROUTES — /api/auth
1️⃣ Register

POST
/api/auth/register

Body (JSON):

{
  "name": "Ramu",
  "email": "test@example.com",
  "password": "123456",
  "phone": "9999999999",
  "role": "patient"
}


Auth: ❌ Not required
Success: 201 Created

2️⃣ Login

POST
/api/auth/login

Body (JSON):

{
  "email": "test@example.com",
  "password": "123456"
}


Auth: ❌ Not required
Success: returns token

🟩 2. USER ROUTES — /api/users
3️⃣ Get All Users

GET
/api/users/

Auth: ❌ Not required (for now)
Success: 200 OK

🟧 3. DOCTOR ROUTES — /api/doctors
4️⃣ Get All Doctors

GET
/api/doctors/

Auth: ❌ Not required
Success: 200 OK

5️⃣ Create Doctor

POST
/api/doctors/

Body (JSON):

{
  "name": "Dr. Murthy",
  "specialization": "Cardiology",
  "experienceYears": 10
}


Auth: ❌ Not required (we will add admin-only later)
Success: 201 Created

🟥 4. APPOINTMENT ROUTES — /api/appointments
6️⃣ Book Appointment

POST
/api/appointments/book

Headers:

Authorization: Bearer <TOKEN_FROM_LOGIN>


Body (JSON):

{
  "doctorId": "65ef3b8f9d27...",
  "startAt": "2025-01-10T10:00:00.000Z",
  "reason": "Chest pain"
}


Auth: ✔ Required
Success: 201 Created

🟨 5. HEALTH CHECK ROUTE
7️⃣ Server Health

GET
/health

Auth: ❌ Not required
Success:

{
  "status": "ok",
  "uptime": 123.45
}
