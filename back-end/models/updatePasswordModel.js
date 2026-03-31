import prisma from "../database/prismaClient.js";
import bcrypt from "bcryptjs";

export async function updatePasswordModel(user_id, currentPassword, newPassword) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id },
            select: { password: true }
        });
        const password = user.password;

        const isMatch = await bcrypt.compare(currentPassword, password);
        if (!isMatch) {
            return { success: false, status: 0, msg: "Current password is incorrect" };
        }

        const newPasswordMatch = await bcrypt.compare(newPassword, password);
        if (newPasswordMatch) {
            return { success: false, status: 1, msg: "New password cannot be the same as the current password" };
        }

        const hashed = await bcrypt.hash(newPassword, 11);
        const result = await prisma.user.update({
            where: { id: user_id },
            data: { password: hashed }
        });

        if (!result) {
            return { success: false, status: 2, msg: "Sth went wrong in updating password to the database" };
        }
        return { success: true, msg: "Password updated successfully" };
    } catch (error) {
        console.error("Error in updatePasswordModel:", error);
        throw error;
    }
}
