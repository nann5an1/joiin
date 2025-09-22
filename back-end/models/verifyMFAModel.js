// verifyMFAModel.js - FIXED VERSION
import pool from "../database/db.js";
import speakeasy from "speakeasy";
import crypto from "crypto";
import env from "dotenv";

env.config();

// Helper function to decrypt MFA secret
function decryptMFASecret(encrypted_with_iv) {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
    
    const [iv_hex, encrypted_data] = encrypted_with_iv.split(':');
    const iv = Buffer.from(iv_hex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted_data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

export async function verifyMFAModel(user_id, usertoken) {
    const connection = await pool.getConnection();
    
    try {
        const sql_cmd = `SELECT mfa_secret from user WHERE id = ?`;
        const [result] = await connection.execute(sql_cmd, [user_id]);
        
        if (result.length === 0 || !result[0].mfa_secret) {
            return { success: false, message: "MFA secret not found" };
        }
        
        // DECRYPT the secret before verification
        const decryptedSecret = decryptMFASecret(result[0].mfa_secret);
        
        // Now verify with the decrypted secret
        const verified = speakeasy.totp.verify({ 
            secret: decryptedSecret,
            encoding: 'base32',
            token: usertoken,
            window: 1 // 30-second tolerance
        });
        
        return { success: verified, message: verified ? "Valid token" : "Invalid token" };
        
    } catch (error) {
        console.error('Error verifying MFA:', error);
        return { success: false, message: "Verification failed" };
    } finally {
        connection.release();
    }
}