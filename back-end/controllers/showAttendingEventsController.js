
import {getAttendingEventsModel} from "../models/getAttendingEvents.js";

export async function showAttendingEvents(req, res){
    try {
        const response_model = await getAttendingEventsModel(req.user.id);
        res.status(200).json(response_model);
    } catch (error) {
        res.status(500).json(response_model);
    }
}