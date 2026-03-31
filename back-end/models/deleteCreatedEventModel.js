import prisma from "../database/prismaClient.js";

export async function deleteCreatedEventModel(user_id, event_id) {
    try {
        const result = await prisma.create_events.deleteMany({
            where: { id: event_id, user_id: user_id }
        });
        return result;
    } catch (error) {
        console.error("Error in deleteCreatedEventModel", error);
        throw error;
    }
}
