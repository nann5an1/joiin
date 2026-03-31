import prisma from "../database/prismaClient.js";

export async function getInterestedEvents(user_id) {
    try {
        const results = await prisma.$queryRaw`
            SELECT ce.*
            FROM interested_events ie
            JOIN create_events ce ON ie.event_id = ce.id
            WHERE ie.user_id = ${String(user_id)}
        `;

        if (results.length === 0) return [];
        return results;
    } catch (error) {
        console.error("Error fetching interested events:", error);
        throw error;
    }
}
