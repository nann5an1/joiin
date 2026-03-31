import prisma from "../database/prismaClient.js";

export async function getAttendingEventsModel(user_id) {
    const result = await prisma.$queryRaw`
        SELECT ce.*
        FROM attending_events ae
        JOIN create_events ce ON ae.event_id = ce.id
        WHERE ae.user_id = ${String(user_id)}
    `;
    console.log("result from getAttendingEventsModel", result);
    return result;
}
