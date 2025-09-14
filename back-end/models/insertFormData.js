//export the data into the database using the model
import pool from "../database/db.js";
export async function insertFormData(userId, data, file){
    try {
        // console.log("data check again", data);
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
            e_status: data.e_status, // Now correctly mapped
            tags: data.tags
        };
        const {
            user_id, title, category, descrip, img, location, pax, org_name, org_email,
            org_phone, start_date, end_date, fares, e_status, tags} = newEvent;
        
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
        user_id, title, category, descrip, img, location, pax, org_name, org_email, org_phone, start_date, end_date, fares, e_status, tags
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        data_values.forEach((val, i) => {
            if (val === undefined) console.warn("🚨 Undefined at index", i);
        });

        const [result] = await pool.execute(sql_cmd, data_values);
        return result;    
    } catch (error) {   
        console.log("oops something went wrong in model insertFormData");
        console.error("Model error in insertFormData:", error.message);
        // throw error;
    }
}
