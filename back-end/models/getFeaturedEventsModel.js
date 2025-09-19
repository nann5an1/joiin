import pool from "../database/db.js";

export async function getFeaturedEvents(){
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        
        const sql_cmd = `SELECT * from create_events ce JOIN audience_count ac ON ce.id = ac.event_id WHERE ac.bool_featured = 1`;
        const [result] = await connection.execute(sql_cmd);
        console.log("result from getFeaturedEventsModel", result);
        await connection.commit();
    } catch (error) {
        console.log("Error in getFeaturedEventsModel", error);
        await connection.rollback();
    }finally{
        console.log("connection released from getFeaturedEventsModel");
        await connection.release();
    }
    return (result);
}