import pool from "../database/db.js";

async function createdEventsData(user_id){
    const sql_cmd = `SELECT * FROM create_events`;
    const [result] = await pool.execute(sql_cmd, [user_id]);
    console.log("Organizer's created events", result);
    return result;
}

export default createdEventsData