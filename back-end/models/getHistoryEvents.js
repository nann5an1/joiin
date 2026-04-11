import prisma from "../database/prismaClient.js";

export default async function getHistoryEventsModel(user_id){
    // JOIN history_events with create_events to get full event details.
    // Role is determined by comparing the event's creator (ce.user_id) to the requesting user.
    // Only returns events whose end_date is in the past.
    const result = await prisma.$queryRaw`
        SELECT
            ce.*,
            CASE WHEN ce.user_id = ${user_id} THEN 'Creator' ELSE 'Attendee' END AS role
        FROM history_events he
        JOIN create_events ce ON he.event_id = CAST(ce.id AS CHAR)
        WHERE he.user_id = ${user_id}
          AND ce.end_date < NOW()
        ORDER BY ce.end_date DESC
    `;
    console.log("get all history events");
    return result;
}