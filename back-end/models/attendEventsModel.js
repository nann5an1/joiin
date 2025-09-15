import pool from "../database/db.js";

export async function attendEventsModel(user_id, event_id){
    const sql_cmd = "INSERT into attending_events (user_id, event_id) VALUES (?, ?)"; //user_id, event_id
    const [result] = await pool.execute(sql_cmd, [user_id, event_id]);
    console.log("Joining events result: ", result);
    return result;
}