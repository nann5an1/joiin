import pool from "../database/db.js";

export async function deleteAccountModel(user_id){
    try {
       await pool.execute("DELETE FROM user WHERE id = ?", [user_id]);
        return ({
            success:true,
            message:"Account deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteAccountModel:", error);
    }
}