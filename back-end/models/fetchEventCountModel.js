import prisma from "../database/prismaClient.js";

export async function fetchEventCountModel(user_id) {
    try {
        const [created_count, joined_count] = await Promise.all([
            prisma.create_events.count({ where: { user_id: user_id } }),
            prisma.attending_events.count({ where: { user_id: String(user_id) } })
        ]);
        console.log("result", { created_count, joined_count });
        return { created_count, joined_count };
    } catch (error) {
        console.log("Error in fetchEventCountModel", error);
        throw error;
    }
}
