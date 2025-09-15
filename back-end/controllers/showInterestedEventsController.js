
import {getInterestedEvents} from "../models/getInterestedEvents.js";

export async function showInterestedEvents(req, res){
    try {
        const modelResponse =  await getInterestedEvents(req.user.id);
        res.status(200).json(modelResponse);
    } catch (error) {
        res.status(500).json(error);
    }
   
}