import pool from "../database/db.js";

export async function attendEventsModel(user_id, event_id){
    const checkSql = 'SELECT id from attending_events WHERE user_id = ? AND event_id = ?';
    const [existing] = await pool.execute(checkSql, [user_id, event_id]);
    if (existing.length > 0) {
        return {success: false, message: "Already joined the event"};
    }
    const sql_cmd = "INSERT into attending_events (user_id, event_id) VALUES (?, ?)"; //user_id, event_id
    const [result] = await pool.execute(sql_cmd, [user_id, event_id]);
    console.log("Joining events result: ", result);
    return result;
}