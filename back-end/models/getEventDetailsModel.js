import pool from '../database/db.js';

export async function getEventDetailsModel(event_id){
    const cmd = 'SELECT * FROM create_events WHERE id = ?';
    const [result] = await pool.execute(cmd, [event_id]);
    console.log("result from getEventDetailsModel", result);
    return result;
}