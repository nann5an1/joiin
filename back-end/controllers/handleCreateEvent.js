//constroller will be calling from the model, which has the database logic
import { insertFormData } from "../models/insertFormData.js";   

// console.log("before createEvent is running");
export async function createEvent(req, res){
    try {
        const result = await insertFormData(req.body, req.file);
        res.status(201).json({"message created": result});
    } catch (error) {
        console.log("error in responding for creating events");
        res.status(500).json("error in responding for creating events");
    }
}