import prisma from "../database/prismaClient.js";

export async function attendEventsModel(user_id, event_id) {
    try {
        await prisma.$transaction(async (tx) => {
            const existing = await tx.attending_events.findFirst({
                where: { user_id: String(user_id), event_id: String(event_id) }
            });

            if (existing) {
                throw Object.assign(new Error("Already joined the event"), { alreadyJoined: true });
            }

            const result = await tx.attending_events.create({
                data: { user_id: String(user_id), event_id: String(event_id) }
            });
            console.log("Joining events result: ", result);

            const updatedSeatCount = await tx.$executeRaw`
                UPDATE audience_count ac
                JOIN create_events ce ON ac.event_id = ce.id
                SET
                    ac.current_count = ac.current_count + 1,
                    ac.remaining_count = ce.pax - ac.current_count
                WHERE ac.event_id = ${String(event_id)}
            `;
            console.log("updatedSeatCount result: ", updatedSeatCount);
        });

        return { success: true, message: "Joined the event" };
    } catch (error) {
        if (error.alreadyJoined) {
            return { success: false, message: "Already joined the event" };
        }
        console.error("Database error:", error);
        return { success: false, message: "Failed to join event due to database error" };
    }
}
