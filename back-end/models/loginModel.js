import pool from "../database/db.js";

export async function loginModel(data){
    const sql_cmd = `SELECT id, name, password from user WHERE email = ?`;
    const {email, password} = data;
    const data_values = [email];
    const [result] = await pool.execute(sql_cmd, data_values); //will return the id, name, password
    console.log("result in loginModel", result);
    return result;
}