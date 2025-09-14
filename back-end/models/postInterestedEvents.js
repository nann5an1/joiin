import pool from '../database/db.js';

export async function postInterestedEventsModel(user_id, event_id) {
    // const user_id = req.user.id;
    // const event_id = req.query;

    try {
        const checkSql = `SELECT id FROM interested_events WHERE user_id = ? AND event_id = ?`;
        const [existing] = await pool.execute(checkSql, [user_id, event_id]);
        
        if (existing.length > 0) {
            return { success: false, message: "Already added to interested events" };
        }

        const sql_cmd = `INSERT INTO interested_events (user_id, event_id) VALUES (?, ?)`; //user_id, event_id
        const [result] = await pool.execute(sql_cmd, [user_id, event_id]); //will return the id, name, password
        return result;
    } catch (error) {
        console.error("Error adding interested event:", error);
        throw error;
    }   
}