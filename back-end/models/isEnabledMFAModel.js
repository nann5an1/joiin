
import pool from "../database/db.js";

export async function isEnabledMFAModel(user_id) {
    const connection = await pool.getConnection();
    try {
        const sql_cmd = 'SELECT mfa_secret, bool_otp FROM user WHERE id = ?';
        const [result] = await connection.execute(sql_cmd, [user_id]);
        
        // Check if user exists and has MFA enabled
        const user = result[0];
        const isMFAEnabled = user && user.mfa_secret && user.bool_otp === 1;
        
        return {
            success: true,
            message: "MFA status checked successfully", 
            data: {
                mfaEnabled: isMFAEnabled,
                hasSecret: !!user?.mfa_secret,
                boolOTP: user?.bool_otp || 0
            }
        };
        
    } catch (error) {
        console.error("Error in isEnabledMFAModel:", error);
        throw error;
    } finally {
        connection.release();
    }
}