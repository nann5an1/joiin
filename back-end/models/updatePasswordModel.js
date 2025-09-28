import pool from "../database/db.js";
import bcrypt from "bcryptjs";

export async function updatePasswordModel(user_id, currentPassword, newPassword) {
    try {
        const [user] = await pool.execute(`SELECT password FROM user WHERE id = ?`, [user_id]);
        const password = user[0].password;

        // console.log("current password: ", currentPassword);
        // console.log("hashed current password: ", password);
        const isMatch = await bcrypt.compare(currentPassword, password);
        // console.log("isMatch: ", isMatch);
        if(!isMatch){
            return {
                success: false,
                status: 0,
                msg: "Current password is incorrect"
            };
        }

        const newPasswordMatch = await bcrypt.compare(newPassword, password);
        // console.log("newPasswordMatch: ", newPasswordMatch);
        if(newPasswordMatch){
            return {
                success: false,
                status: 1,
                msg: "New password cannot be the same as the current password"
            };
        }

        const hashed = await bcrypt.hash(newPassword, 11);
        const [result] = await pool.execute(`UPDATE user SET password = ? WHERE id = ?`, [hashed, user_id]);//update the password in the database
        // console.log("affected rows: ", result.affectedRows);
        if(result.affectedRows == 0){
            return {
                success: false,
                status: 2,
                msg: "Sth went wrong in updating password to the database"
            }
        }
        return {
            success: true,
            msg: "Password updated successfully"
        }
    } catch (error) {
        console.error("Error in updatePasswordModel:", error);
        throw error;
    }
}