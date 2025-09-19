import {postFeaturedEventsModel} from "../models/postFeaturedEventsModel.js";

export async function postFeaturedEventsController(req, res){
    try {
        const modelResponse = await postFeaturedEventsModel();
        if(modelResponse.ok) res.status(200).json(modelResponse);
    } catch (error) {
        res.status(500).json(error);
    }
    
}