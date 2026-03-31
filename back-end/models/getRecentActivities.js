import prisma from "../database/prismaClient.js";

export async function recentActivitiesModel() {
    const rows = await prisma.create_events.findMany({
        where: { start_date: { gt: new Date() } }
    });
    return rows;
}
