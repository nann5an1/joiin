import prisma from "../database/prismaClient.js";

export async function freeActivitiesModel() {
    try {
        const response = await prisma.create_events.findMany({
            where: { fares: { equals: 'free' } }
        });
        return response;
    } catch (error) {
        console.error("error in fetching activiites model: ", error);
        throw error;
    }
}
