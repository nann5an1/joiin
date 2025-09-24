import pool from "../database/db.js";

export async function fetchEventCountModel(user_id) {
    try {
        const [result] = await pool.execute('SELECT COUNT (*) as count FROM create_events WHERE user_id = ?', [user_id]); //./execute return the tuple
         console.log("result", result);

        const [returned] = await pool.execute('SELECT COUNT (*) as count FROM attending_events WHERE user_id = ?', [user_id]); //./execute return the tuple
        return {
            created_count: result[0].count,
            joined_count: returned[0].count
        };
    } catch (error) {
        console.log("Error in fetchEventCountModel", error);
        throw error;
    }
}