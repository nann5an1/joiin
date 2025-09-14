import {postInterestedEventsModel} from "../models/postInterestedEvents.js";

export async function addInterestedEvents(req, res){
    try {
        // console.log("query: ", req.query);
        //destructure the event_id
        const {event_id} = req.query; //req.query is the object containing the query parameters the req.query has {event_id: 12} 
        console.log("event id: ", event_id);
        const modelResponse= await postInterestedEventsModel(req.user.id, event_id);
        res.status(200).json(modelResponse);
    } catch (error) {
        res.status(500).json(error);
    }
}