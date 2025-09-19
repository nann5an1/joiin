//get the featured events back into the frontend
import {getFeaturedEvents} from "../models/getFeaturedEventsModel.js";

export async function showFeaturedEventsController(req, res){
    try {
        const responseModel = await getFeaturedEvents();
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
    
}