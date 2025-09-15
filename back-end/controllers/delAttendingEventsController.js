
import {deleteAttendingEventsModel} from "../models/deleteAttendingEvents.js"

export async function removeAttendingEvents(req, res){
    try {
        const responseModel = await deleteAttendingEventsModel(req.user.id, req.query.event_id);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
}