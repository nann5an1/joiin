//fetch username and email for profiling out for brief

import pool from "../database/db.js";

export async function fetchBriefProfileModel(user_id){
    try {
        const data = await pool.execute(`SELECT name, email FROM user WHERE id = ?`, [user_id]);
        console.log("data output in fetchProfileModel", data);
        const row = data[0][0];
        return {
            profileName: row.name,
            email: row.email
        };
    } catch (error) {
        console.error("error in fetching profile from model", error);
        throw error;
    }
}