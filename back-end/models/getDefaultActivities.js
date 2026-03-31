import prisma from "../database/prismaClient.js";

export async function defaultActivitiesModel() {
    const rows = await prisma.create_events.findMany();
    console.log("rows output in defaultActivitiesModel", rows);
    return rows;
}
