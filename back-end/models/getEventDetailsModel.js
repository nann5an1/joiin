import prisma from "../database/prismaClient.js";

export async function getEventDetailsModel(event_id) {
    const result = await prisma.create_events.findMany({
        where: { id: parseInt(event_id, 10) }
    });
    console.log("result from getEventDetailsModel", result);
    return result;
}
