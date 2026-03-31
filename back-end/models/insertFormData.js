import prisma from "../database/prismaClient.js";

export async function insertFormData(userId, data, file) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const tags = data.tags
                ? JSON.stringify(data.tags.split(',').map(tag => tag.trim()))
                : null;

            const event = await tx.create_events.create({
                data: {
                    user_id: userId,
                    title: data.title || null,
                    category: data.category || null,
                    descrip: data.descrip,
                    img: file ? `/uploads/${file.filename}` : null,
                    location: data.location || null,
                    pax: data.pax || null,
                    org_name: data.org_name || null,
                    org_email: data.org_email || null,
                    org_phone: data.org_phone || null,
                    start_date: data.start_date || null,
                    end_date: data.end_date || null,
                    fares: data.fares || null,
                    e_status: data.e_status,
                    tags
                }
            });

            console.log("Event created with ID:", event.id);

            const audience_count = await tx.audience_count.create({
                data: {
                    event_id: String(event.id),
                    current_count: '0',
                    remaining_count: String(data.pax),
                    bool_featured: '0'
                }
            });

            console.log("Audience count initialized:", audience_count);
            return event;
        });

        return {
            success: true,
            eventId: result.id,
            insertId: result.id,
            affectedRows: 1,
            message: "Event created successfully"
        };
    } catch (error) {
        console.log("❌ Error in insertFormData");
        console.error("Model error in insertFormData:", error.message);
        return {
            success: false,
            error: error.message,
            message: "Failed to create event"
        };
    }
}
