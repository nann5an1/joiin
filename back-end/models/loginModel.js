import pool from "../database/db.js";

export async function loginModel(data){
    const sql_cmd = `SELECT password from user WHERE email = ?`;
    const {email, password} = data;
    const data_values = [email, password];
    const [result] = await pool.execute(sql_cmd, data_values[0]);
    return result;
}