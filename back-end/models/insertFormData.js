//export the data into the database using the model
const pool = require("../database/db.js");

export async function insertFormData(data){
    try {
        const {title, category, desc, img, location, org_name, org_email, org_phone, start_date, end_date, status, tags} = data;
        const sql_cmd = `INSERT INTO events (
        title, description, location, status, whattobring
        )
        VALUES (?, ?, ?, ?, ?)
        `;
        const data_values = [title, desc, location, status, JSON.stringify(tags || [])];
        const [result] = await pool.execute(sql_cmd, data_values);
        return result;    
    } catch (error) {   
        res.status(500).json("oops something went wrong in model insertFormData");
    }
}

insertFormData