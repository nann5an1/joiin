import pool from "../database/db.js";
import crypto from "crypto";

export async function setMFAModel(user_id, secret){
    const connection = await pool.getConnection();
    try {
        connection.beginTransaction();

        const cipher = crypto.createCipheriv("aes-256-cbc", secret);
        const encrypted_data = cipher.update(secret, "utf8", "hex");
        encrypted_data += cipher.final('hex');

        const sql_cmd = 'UPDATE user SET mfa_secret = ?, bool_otp = 1 WHERE id = ?';
        const [result] = await pool.execute(sql_cmd, [encrypted_data, user_id]);

        connection.commit();
        return ({
            success:true,
            message:"MFA secret set successfully",
            data: result
        })
    } catch (error) {
        connection.release();
    }
}