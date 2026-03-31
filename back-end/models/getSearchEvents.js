import prisma from "../database/prismaClient.js";

export async function getSearchEventsModel(searchParam) {
    try {
        if (!searchParam || searchParam.trim() === '') return [];

        const searchTerm = `%${searchParam}%`;

        const result = await prisma.$queryRaw`
            SELECT * FROM create_events
            WHERE LOWER(title) LIKE LOWER(${searchTerm})
               OR LOWER(category) LIKE LOWER(${searchTerm})
               OR LOWER(descrip) LIKE LOWER(${searchTerm})
               OR LOWER(location) LIKE LOWER(${searchTerm})
        `;

        console.log("result from getSearchEventsModel", result);
        return result;
    } catch (error) {
        console.error("Error in getSearchEventsModel:", error);
        throw error;
    }
}
