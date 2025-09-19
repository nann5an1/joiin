import { connect } from "http2";
import pool from "../database/db.js";

export async function getSearchEventsModel(searchParam){
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const cmd_sql = `SELECT * FROM create_events 
                 WHERE title LIKE ? 
                 OR category LIKE ? 
                 OR descrip LIKE ? 
                 OR location LIKE ?`;
        const [result] = await connection.execute(cmd_sql, [searchParam, searchParam, searchParam, searchParam]);
        console.log("result from getSearchEventsModel", result);
        await connection.commit();

        console.log("connection created in getSearchEventsModel", conn);
    } catch (error) {
        await connection.rollback();
    }finally{
        connection.release();
    }
}