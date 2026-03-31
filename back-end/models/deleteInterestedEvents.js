import prisma from "../database/prismaClient.js";

export async function deleteInterestedEventsModel(user_id, event_id) {
    console.log("event id to delete: ", event_id);
    const result = await prisma.interested_events.deleteMany({
        where: { user_id: String(user_id), event_id: String(event_id) }
    });
    console.log("result from the delete interested events", result);
    return result;
}
