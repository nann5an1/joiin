import pool from "../database/db.js";

export async function deleteAttendingEventsModel(user_id, event_id) {
    console.log("attendingevent id to delete: ", event_id);
    const sql_cmd = `DELETE FROM attending_events WHERE user_id = ? && event_id = ?`;
    const [result] = await pool.execute(sql_cmd, [user_id, event_id]);
    console.log("result from the delete attending events", result);
    return result;
}