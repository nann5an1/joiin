import prisma from "../database/prismaClient.js";

export async function isEnabledMFAModel(user_id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id },
            select: { mfa_secret: true }
        });
        const isMFAEnabled = user && user.mfa_secret;
        return {
            success: true,
            message: "MFA status checked successfully",
            data: {
                mfaEnabled: isMFAEnabled,
                hasSecret: !!user?.mfa_secret
            }
        };
    } catch (error) {
        console.error("Error in isEnabledMFAModel:", error);
        throw error;
    }
}
