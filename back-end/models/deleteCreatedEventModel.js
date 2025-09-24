import pool from "../database/db.js";

export async function deleteCreatedEventModel(user_id, event_id){
    try {
        const [result] = await pool.execute("DELETE from create_events WHERE id = ? && user_id = ?", [event_id, user_id]);
        return result;
    } catch (error) {
        console.error("Error in deleteCreatedEventModel", error);
        throw error;
    }
}