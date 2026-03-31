import prisma from "../database/prismaClient.js";

export async function updateProfileModel(user_id, username) {
    try {
        const count = await prisma.user.count({
            where: { name: username, NOT: { id: user_id } }
        });
        console.log("returned", count);

        if (count > 0) {
            return { success: false, msg: "Username already exists" };
        }

        const result = await prisma.user.update({
            where: { id: user_id },
            data: { name: username }
        });

        if (!result) {
            return { success: false, msg: "Profile not updated" };
        }
        return { success: true, msg: "Profile updated successfully" };
    } catch (error) {
        console.log("error in updating profile model", error);
        throw error;
    }
}
