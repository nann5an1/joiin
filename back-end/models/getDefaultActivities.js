import pool from "../database/db.js";

export async function defaultActivitiesModel() {
    const [rows] = await pool.execute(`SELECT * FROM create_events`); //./execute return the tuple
    console.log("rows output in defaultActivitiesModel", rows);
    return rows;
}