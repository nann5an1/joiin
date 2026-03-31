import prisma from "../database/prismaClient.js";

export async function fetchBriefProfileModel(user_id) {
    try {
        const row = await prisma.user.findUnique({
            where: { id: user_id },
            select: { name: true, email: true }
        });
        console.log("data output in fetchProfileModel", row);
        return {
            profileName: row.name,
            email: row.email
        };
    } catch (error) {
        console.error("error in fetching profile from model", error);
        throw error;
    }
}
