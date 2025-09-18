//export the data into the database using the model
import pool from "../database/db.js";

export async function insertFormData(userId, data, file) {
    const connection = await pool.getConnection();
    
    try {
        // Start transaction to ensure data consistency
        await connection.beginTransaction();
        
        const newEvent = {
            user_id: userId,
            title: data.title,
            category: data.category,
            descrip: data.descrip,
            img: file ? `/uploads/${file.filename}` : null,
            location: data.location,
            pax: data.pax,
            org_name: data.org_name,
            org_email: data.org_email,
            org_phone: data.org_phone,
            start_date: data.start_date,
            end_date: data.end_date,
            fares: data.fares,
            e_status: data.e_status,
            tags: data.tags
        };
        
        const {
            user_id, title, category, descrip, img, location, pax, org_name, org_email,
            org_phone, start_date, end_date, fares, e_status, tags
        } = newEvent;
       
        const data_values = [
            user_id,
            title || null,
            category || null,
            descrip,
            img,
            location || null,
            pax || null,
            org_name || null,
            org_email || null,
            org_phone || null,
            start_date || null,
            end_date || null,
            fares || null,
            e_status,
            tags ? JSON.stringify(tags.split(',').map(tag => tag.trim())) : null
        ];
        
        const sql_cmd = `INSERT INTO create_events (
            user_id, title, category, descrip, img, location, pax, org_name, org_email, 
            org_phone, start_date, end_date, fares, e_status, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
       
        // Debug: Check for undefined values
        data_values.forEach((val, i) => {
            if (val === undefined) console.warn("🚨 Undefined at index", i);
        });
        
        // Insert the event
        const [result] = await connection.execute(sql_cmd, data_values);
        const eventId = result.insertId;
        
        console.log("Event created with ID:", eventId);
        
        // Initialize audience count for the new event
        const audienceCountSql = 'INSERT INTO audience_count (event_id, current_count, remaining_count, bool_featured) VALUES (?, 0, ?, 0)';
        const [audience_count] = await connection.execute(audienceCountSql, [eventId, pax]);
        
        console.log("Audience count initialized:", audience_count);
        
        // Commit the transaction
        await connection.commit();
        
        return {
            success: true,
            eventId: eventId,
            insertId: result.insertId,
            affectedRows: result.affectedRows,
            message: "Event created successfully"
        };
        
    } catch (error) {
        // Rollback transaction on error
        await connection.rollback();
        console.log("❌ Error in insertFormData");
        console.error("Model error in insertFormData:", error.message);
        
        return {
            success: false,
            error: error.message,
            message: "Failed to create event"
        };
        
    } finally {
        // Always release the connection back to the pool
        connection.release();
    }
}