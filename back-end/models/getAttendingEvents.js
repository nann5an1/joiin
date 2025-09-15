import pool from "../database/db.js";

export async function getAttendingEventsModel(user_id){
    const sql_cmd = `
     SELECT 
        ce.*
        FROM attending_events ae
        JOIN create_events ce ON ae.event_id = ce.id
        WHERE ae.user_id = ?`;
    const [result] = await pool.execute(sql_cmd, [user_id]); 
    console.log("result from getAttendingEventsModel", result);
    return result;
}