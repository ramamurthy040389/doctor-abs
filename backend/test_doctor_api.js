import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

async function testDoctorAPI() {
    try {
        // 1. Register a Doctor User
        console.log("Registering Doctor User...");
        const registerRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Dr. API Test",
                email: `docapi${Date.now()}@example.com`,
                password: "password123",
                role: "doctor"
            })
        });
        const registerData = await registerRes.json();
        console.log("Register Response:", registerData);

        if (!registerData.success) throw new Error("Registration failed");
        const token = registerData.token;

        // 2. Create Doctor Profile
        console.log("\nCreating Doctor Profile...");
        const profileRes = await fetch(`${BASE_URL}/doctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                specialization: "Neurology",
                experience: 15,
                qualifications: ["MBBS", "MD", "DM"],
                bio: "Expert Neurologist",
                fees: 1000,
                availableSlots: []
            })
        });
        const profileData = await profileRes.json();
        console.log("Profile Response:", profileData);

        if (!profileData._id) throw new Error("Failed to create profile");

        // 3. Get All Doctors
        console.log("\nFetching All Doctors...");
        const allDocsRes = await fetch(`${BASE_URL}/doctors`);
        const allDocsData = await allDocsRes.json();
        console.log("All Doctors Count:", allDocsData.length);

        if (!Array.isArray(allDocsData)) throw new Error("Failed to fetch doctors");

        console.log("\n✅ Doctor API Verified!");

    } catch (error) {
        console.error("❌ Test Failed:", error);
    }
}

testDoctorAPI();
