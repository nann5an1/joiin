import pool from "../database/db.js";

export async function getSearchEventsModel(searchParam){
    const connection = await pool.getConnection();
    try {
        // Handle case when searchParam is undefined or empty
        if (!searchParam || searchParam.trim() === '') return []; // Return empty array for empty search
        
        // Add wildcards for partial matching
        const searchTerm = `%${searchParam}%`;
        
        const cmd_sql = `SELECT * FROM create_events
                         WHERE LOWER(title) LIKE LOWER(?)
                         OR LOWER(category) LIKE LOWER(?)
                         OR LOWER(descrip) LIKE LOWER(?)
                         OR LOWER(location) LIKE LOWER(?)
                         `;
        
        const [result] = await connection.execute(cmd_sql, [searchTerm, searchTerm, searchTerm, searchTerm]);
        console.log("result from getSearchEventsModel", result);
        connection.commit();
        return result;
        
    } catch (error) {
        console.error("Error in getSearchEventsModel:", error);
        throw error;
    } finally {
        connection.release();
    }
}