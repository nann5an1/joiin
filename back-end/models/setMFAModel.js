// setMFAModel.js
import pool from "../database/db.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export async function setMFAModel(user_id, secret) {
    const connection = await pool.getConnection();
   
    try {
        await connection.beginTransaction();
       
        // FIXED: Use a proper 32-byte encryption key, not the secret itself
        const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 chars
        const iv = crypto.randomBytes(16);
       
        const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
        let encrypted_data = cipher.update(secret, "utf8", "hex");
        encrypted_data += cipher.final('hex');
       
        const encrypted_with_iv = iv.toString('hex') + ':' + encrypted_data;
       
        const sql_cmd = 'UPDATE user SET mfa_secret = ?, bool_otp = 1 WHERE id = ?';
        const [result] = await connection.execute(sql_cmd, [encrypted_with_iv, user_id]);
       
        await connection.commit();
       
        return {
            success: true,
            message: "MFA secret set successfully",
            data: result
        };
       
    } catch (error) {
        await connection.rollback();
        console.error('Error setting MFA:', error);
       
        return {
            success: false,
            message: "Failed to set MFA secret",
            error: error.message
        };
    } finally {
        connection.release();
    }
}