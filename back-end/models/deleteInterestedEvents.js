import pool from '../database/db.js';

export async function deleteInterestedEventsModel(user_id, event_id){
    console.log("event id to delete: ", event_id);
    const sql_cmd = `DELETE FROM interested_events WHERE user_id = ? && event_id = ?`;
    const [result] = await pool.execute(sql_cmd, [user_id, event_id]);
    console.long("result from the delete interested events", result);
    return result;
}