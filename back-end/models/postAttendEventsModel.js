import pool from "../database/db.js";

export async function attendEventsModel(user_id, event_id){
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const checkSql = 'SELECT id from attending_events WHERE user_id = ? AND event_id = ?';
        const [existing] = await connection.execute(checkSql, [user_id, event_id]);
        if (existing.length > 0) {
            return {success: false, message: "Already joined the event"};
        }
        const sql_cmd = "INSERT into attending_events (user_id, event_id) VALUES (?, ?)"; //user_id, event_id
        const [result] = await connection.execute(sql_cmd, [user_id, event_id]);
        console.log("Joining events result: ", result);

        ///////////////////////////////////////////////////////////////////////////////
        //only increment the audience joining count and decrement remaining count when the user joins the event


        //if it's the same user_id don't update
        //reduce the remaining seats count
        // const updateRemainingSql = `
        // UPDATE audience_count ac
        // JOIN create_events ce ON ac.event_id = ce.id
        // SET ac.remaining_count = ce.pax - ac.current_count
        // WHERE ac.event_id = ?
        // `;
        // const [remainingResult] = await connection.execute(updateRemainingSql, [event_id]);
        // console.log("remaining_count updated:", remainingResult);

        //check if the event_id already exists (if haven't, create a new row)
        // const cmd = `SELECT id from audience_count WHERE event_id = ?`;
        // const [existingCount] = await connection.execute(cmd, [event_id]);
        // if(existingCount.length > 0){
            
        // }

        // //increment the joining seat count
        const updateSeatCountSql = `
        UPDATE audience_count ac
        JOIN create_events ce ON ac.event_id = ce.id
        SET 
            ac.current_count = ac.current_count + 1,
            ac.remaining_count = ce.pax - ac.current_count
        WHERE ac.event_id = ?
        `;

        const [updatedSeatCount] = await connection.execute(updateSeatCountSql, [event_id]);
        console.log("updatedSeatCount result: ", updatedSeatCount);
        await connection.commit();

    } catch (error) {
        await connection.rollback();
        console.error("Database error:", error);
        return {success: false, message: "Failed to join event due to database error"};
    }finally {
        connection.release(); // Always release the connection
    }

    return {success: true, message: "Joined the event"};
}