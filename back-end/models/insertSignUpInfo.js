import pool from "../database/db.js";

export async function signUpModel(data){
    console.log(data);
    const sql_cmd = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
    const {name, email, password} = data; //destructure the data
    const data_values = [name, email, password];
    const result = await pool.execute(sql_cmd, data_values);
    console.log(result);
    return (result);
}
