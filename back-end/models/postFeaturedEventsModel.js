import prisma from "../database/prismaClient.js";

export async function postFeaturedEventsModel() {
    try {
        console.log("🔄 Starting featured events calculation for all events...");

        const affectedRows = await prisma.$executeRaw`
            UPDATE audience_count ac
            JOIN create_events ce ON ac.event_id = ce.id
            SET ac.bool_featured = CASE
                WHEN ce.pax > 0 AND (ac.current_count / ce.pax * 1.0) >= 0.25 THEN 1
                ELSE 0
            END
        `;

        console.log(`✅ Featured status updated for ${affectedRows} events`);
        return {
            success: true,
            message: "Featured events calculation completed",
            affectedRows
        };
    } catch (error) {
        console.error("❌ Error in postFeaturedEventsModel:", error);
        return {
            success: false,
            message: "Failed to calculate featured events",
            error: error.message
        };
    }
}
