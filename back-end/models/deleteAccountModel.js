import prisma from "../database/prismaClient.js";

export async function deleteAccountModel(user_id) {
    try {
        await prisma.user.delete({ where: { id: user_id } });
        return { success: true, message: "Account deleted successfully" };
    } catch (error) {
        console.error("Error in deleteAccountModel:", error);
    }
}
