import pool from "../database/db.js";

export async function freeActivitiesModel(){
    try{
        const [response] = await pool.execute(`SELECT * from create_events WHERE LOWER(fares) = "free"`);
        return response;
    }catch(error){
        console.error("error in fetching activiites model: ", error);
        throw error;
    }
}