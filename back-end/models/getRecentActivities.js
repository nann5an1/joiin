import pool from "../database/db.js";
export async function recentActivitiesModel() { //must retrieve recent activites from the database (the timing must be checked here)
    // This function will interact with the database to fetch recent activities
    console.log("Now", new Date().toISOString());
    const result = await pool.execute("SELECT * FROM create_events WHERE start_date > NOW()")
   console.log("Recent activities fetched:", result);
    return result;
}