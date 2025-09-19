//this model will do the logic whether the event is considered as a featured event
import pool from "../database/db.js";

export async function postFeaturedEventsModel() {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        console.log("🔄 Starting featured events calculation for all events...");
        
        // Update ALL events in one query - much more efficient than looping
        const updateAllFeaturedSql = `
            UPDATE audience_count ac
            JOIN create_events ce ON ac.event_id = ce.id
            SET ac.bool_featured = CASE 
                WHEN ce.pax > 0 AND (ac.current_count / ce.pax * 1.0) >= 0.25 THEN 1
                ELSE 0
            END
        `;
    
        const [result] = await connection.execute(updateAllFeaturedSql);
        console.log(`✅ Featured status updated for ${result.affectedRows} events`);
        // console.log("affected bool featured: ", result.affectedRows);
        await connection.commit();
        
        return {
            success: true,
            message: "Featured events calculation completed",
            affectedRows: result.affectedRows
        };
        
    } catch (error) {
        await connection.rollback();
        console.error("❌ Error in postFeaturedEventsModel:", error);
        
        return {
            success: false,
            message: "Failed to calculate featured events",
            error: error.message
        };
        
    } finally {
        connection.release();
    }
}