import {deleteCreatedEventModel} from "../models/deleteCreatedEventModel.js";

export async function delCreatedEventController(req, res){
    try {
        const response_data  = await deleteCreatedEventModel(req.user.id, req.query.event_id);
        res.status(200).json(response_data);
    } catch (error) {
        res.status(500).json(error);
    }
}