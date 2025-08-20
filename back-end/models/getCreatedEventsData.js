import pool from "../database/db.js";

async function createdEventsData(){
    // console.log("createdEventsData is running");
    //tweak the sql cmd to (where user_id = ?)
    const sql_cmd = `SELECT * FROM create_events`;
    const [result] = await pool.execute(sql_cmd);
    // console.log(result); //already in js format
    return result;
}

export default createdEventsData