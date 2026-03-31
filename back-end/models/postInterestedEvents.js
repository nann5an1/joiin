import prisma from "../database/prismaClient.js";

export async function postInterestedEventsModel(user_id, event_id) {
    try {
        const existing = await prisma.interested_events.findFirst({
            where: { user_id: String(user_id), event_id: String(event_id) }
        });

        if (existing) {
            return { success: false, message: "Already added to interested events" };
        }

        const result = await prisma.interested_events.create({
            data: { user_id: String(user_id), event_id: String(event_id) }
        });
        return result;
    } catch (error) {
        console.error("Error adding interested event:", error);
        throw error;
    }
}
