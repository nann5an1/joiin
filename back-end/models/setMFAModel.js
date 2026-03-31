import prisma from "../database/prismaClient.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export async function setMFAModel(user_id, secret) {
    try {
        const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
        let encrypted_data = cipher.update(secret, "utf8", "hex");
        encrypted_data += cipher.final("hex");

        const encrypted_with_iv = iv.toString("hex") + ":" + encrypted_data;

        const result = await prisma.user.update({
            where: { id: user_id },
            data: { mfa_secret: encrypted_with_iv }
        });

        return { success: true, message: "MFA secret set successfully", data: result };
    } catch (error) {
        console.error("Error setting MFA:", error);
        return { success: false, message: "Failed to set MFA secret", error: error.message };
    }
}
