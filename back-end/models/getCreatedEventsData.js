import prisma from "../database/prismaClient.js";

async function createdEventsData(user_id) {
    const result = await prisma.create_events.findMany({
        where: { user_id: user_id }
    });
    console.log("Organizer's created events", result);
    return result;
}

export default createdEventsData;
