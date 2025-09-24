import pool from "../database/db.js";

export async function updateProfileModel(user_id, username){
    try {
        const [returned] = await pool.execute(`SELECT COUNT(*) as count FROM user WHERE name = ? AND id != ?`, [username, user_id]);
        console.log("returned", returned);
        if(returned[0].count > 0){
            return {
                success: false,
                msg: "Username already exists"  
          };
        }
        else{
            const [result] = await pool.execute(`UPDATE user SET name = ? WHERE id = ?`, [username, user_id] );
            if(result.affectedRows == 0){
                return {
                    success: false,
                    msg: "Profile not updated"
                };
            }
            return {
                success: true,
                msg: "Profile updated successfully"
            };
        }
    } catch (error) {
        console.log("error in updating profile model", error);
        throw error;
    }
}