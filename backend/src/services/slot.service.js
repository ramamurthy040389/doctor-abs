export function generateSlots(start, end, durationMin, appointments) {
    const slots = [];

    let cursor = new Date(start);

    while (cursor < end) {
        const slotStart = new Date(cursor);
        const slotEnd = new Date(cursor.getTime() + durationMin * 60000);

        const conflict = appointments.some(a =>
            a.startTime < slotEnd && a.endTime > slotStart
        );

        if (!conflict) {
            slots.push({ start: slotStart, end: slotEnd });
        }

        cursor = slotEnd;
    }

    return slots;
}
