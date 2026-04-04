import prisma from "../database/prismaClient.js";

export async function getFeaturedEvents() {
    const result = await prisma.$queryRaw`
        SELECT ce.* FROM create_events ce
        JOIN audience_count ac ON ce.id = ac.event_id
        WHERE ac.bool_featured = 1
    `;
    console.log("result from getFeaturedEventsModel", result);
    return result;
}
