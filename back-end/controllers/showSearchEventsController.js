
import {getSearchEventsModel} from "../models/getSearchEvents.js";
export async function showSearchEvents(req, res){
    try {
        console.log("searchParam: ", req.query.search);
        const responseModel = await getSearchEventsModel(req.query.search);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
    
    
}