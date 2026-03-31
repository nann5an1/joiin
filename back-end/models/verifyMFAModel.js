import prisma from "../database/prismaClient.js";
import speakeasy from "speakeasy";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

function decryptMFASecret(encrypted_with_iv) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    const [iv_hex, encrypted_data] = encrypted_with_iv.split(":");
    const iv = Buffer.from(iv_hex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted_data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export async function verifyMFAModel(user_id, usertoken) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id },
            select: { mfa_secret: true }
        });

        if (!user || !user.mfa_secret) {
            return { success: false, message: "MFA secret not found" };
        }

        const decryptedSecret = decryptMFASecret(user.mfa_secret);
        const verified = speakeasy.totp.verify({
            secret: decryptedSecret,
            encoding: "base32",
            token: usertoken,
            window: 1
        });

        return { success: verified, message: verified ? "Valid token" : "Invalid token" };
    } catch (error) {
        console.error("Error verifying MFA:", error);
        return { success: false, message: "Verification failed" };
    }
}
