    import pool from "../database/db.js";
    import bcrypt from "bcryptjs";

    export async function signUpModel(data){
        const sql_cmd = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
        const {name, email, password} = data; //destructure the data

        const [result] = `SELECT COUNT (*) from `
       
        console.log(data);

        const saltRounds = 11;
        try {
            const hashed = await bcrypt.hash(password, saltRounds) //no need to genearate the hash first can use the saltRounds to hash immediately
            if(hashed.length > 0){
                console.log("hashed password", hashed);
                const data_values = [name, email, hashed];
                const result = await pool.execute(sql_cmd, data_values);
                console.log(result);
                return (result);
            } 
        } catch (error) {
            console.error("Error in hashing password", error);
            throw error;
        }
    }
