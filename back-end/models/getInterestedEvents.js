import pool from "../database/db.js";

export async function getInterestedEvents(user_id) {
    try {
        // Single JOIN query to get all interested events with complete event data
        const query = `
            SELECT 
                ce.*
            FROM interested_events ie
            JOIN create_events ce ON ie.event_id = ce.id
            WHERE ie.user_id = ?
        `;
        
        const [results] = await pool.execute(query, [user_id]);
        
        console.log("getInterestedEvents results:", results);
        
        // Return empty array if no results
        if (results.length === 0) {
            return [];
        }
        return results; // Returns array of complete event objects
        
    } catch (error) {
        console.error("Error fetching interested events:", error);
        throw error;
    }
}