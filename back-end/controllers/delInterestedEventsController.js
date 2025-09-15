
import {deleteInterestedEventsModel} from '../models/deleteInterestedEvents.js';
export async function removeInterestedEvents(req, res){
    try {
        console.log("requested query for deletion: ", req.query);
        const {event_id} = req.query; //req.query contain the event_id to be deleted
        const responseModel = await deleteInterestedEventsModel(req.user.id, event_id);
        if(responseModel.ok)
            res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
}