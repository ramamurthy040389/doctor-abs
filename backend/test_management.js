import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/appointments';

async function test() {
    try {
        // 1. Create Appointment
        console.log("Creating Appointment...");
        const createRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                doctorId: "507f1f77bcf86cd799439011",
                startTime: "2024-12-06T10:00:00.000Z",
                endTime: "2024-12-06T11:00:00.000Z"
            })
        });
        const createData = await createRes.json();
        console.log("Create Response:", createData);

        if (!createRes.ok) throw new Error("Failed to create appointment");
        const appointmentId = createData.appointment._id;
        console.log("Appointment ID:", appointmentId);

        // 2. Reschedule Appointment
        console.log("\nRescheduling Appointment...");
        const rescheduleRes = await fetch(`${BASE_URL}/${appointmentId}/reschedule`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                startTime: "2024-12-06T12:00:00.000Z",
                endTime: "2024-12-06T13:00:00.000Z"
            })
        });
        const rescheduleData = await rescheduleRes.json();
        console.log("Reschedule Response:", rescheduleData);
        if (!rescheduleRes.ok) throw new Error("Failed to reschedule");

        // 3. Cancel Appointment
        console.log("\nCancelling Appointment...");
        const cancelRes = await fetch(`${BASE_URL}/${appointmentId}/cancel`, {
            method: 'PUT'
        });
        const cancelData = await cancelRes.json();
        console.log("Cancel Response:", cancelData);
        if (!cancelRes.ok) throw new Error("Failed to cancel");

    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
