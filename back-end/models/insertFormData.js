//export the data into the database using the model
import pool from "../database/db.js";

export async function insertFormData(data){
    try {
        console.log("data check again", data);
        const {title, category, descrip, img, location, pax, org_name, org_email, org_phone, start_date, end_date, fares, e_status, tags} = data;
        const sql_cmd = `INSERT INTO create_events (
        title, category, descrip, img, location, pax, org_name, org_email, org_phone, start_date, end_date, fares, e_status, tags
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const data_values = [title, category, descrip, img, location, pax, org_name, org_email, org_phone, start_date, end_date, fares, e_status, JSON.stringify(tags || [])];
        data_values.forEach((val, i) => {
            if (val === undefined) console.warn("🚨 Undefined at index", i);
        });

        const [result] = await pool.execute(sql_cmd, data_values);
        return result;    
    } catch (error) {   
        console.log("oops something went wrong in model insertFormData");
        console.error("Model error in insertFormData:", error.message);
        throw error;
    }
}
