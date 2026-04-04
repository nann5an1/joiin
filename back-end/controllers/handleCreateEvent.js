//constroller will be calling from the model, which has the database logic
import { insertFormData } from "../models/insertFormData.js";   

// console.log("before createEvent is running");
export async function createEvent(req, res){
    try {
        console.log("user id print in handleCreateEvent", req.user.id);
        const mappedData = {
            title: req.body.title || null,
            category: req.body.category || null,
            descrip: req.body.descrip || null,
            location: req.body.location || null,
            pax: Number(req.body.pax) || null,
            org_name: req.body.org_name || null,
            org_email: req.body.org_email || null,
            org_phone: req.body.org_phone || null,
            start_date: req.body.start_date || null,
            end_date: req.body.end_date || null,
            fares: req.body.fares || null,
            e_status: req.body.e_status, // 🔧 Map 'status' to 'e_status'
            tags: req.body.tags || null,
        };
        const result = await insertFormData(req.user.id, mappedData, req.file);
        res.status(201).json({"message created": result});
    } catch (error) {
        console.log("error in responding for creating events");
        res.status(500).json("error in responding for creating events");
    }
}