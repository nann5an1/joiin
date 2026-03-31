import prisma from "../database/prismaClient.js";

export async function deleteAttendingEventsModel(user_id, event_id) {
    console.log("attendingevent id to delete: ", event_id);
    const result = await prisma.attending_events.deleteMany({
        where: { user_id: String(user_id), event_id: String(event_id) }
    });
    console.log("result from the delete attending events", result);
    return result;
}
