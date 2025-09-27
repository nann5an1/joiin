    import pool from "../database/db.js";
    import bcrypt from "bcryptjs";

    export async function signUpModel(data){
        const {name, email, password} = data; //destructure the data

        const [result] = await pool.execute(`SELECT COUNT (*) as count from user WHERE email = ?`, [email]);
        
        if(result[0].count > 0){
            return {
                success: false,
                msg: "Email already exists"
            };
        }
        // console.log(data);

        const saltRounds = 11;
        try {
            const hashed = await bcrypt.hash(password, saltRounds) //no need to genearate the hash first can use the saltRounds to hash immediately
            if(hashed.length > 0){
                console.log("hashed password", hashed);
                const data_values = [name, email, hashed];
                const result = await pool.execute(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, data_values);
                console.log(result);
                return {
                    success: true,
                    result: result
                };
            } 
        } catch (error) {
            console.error("Error in hashing password", error);
            throw error;
        }
    }
