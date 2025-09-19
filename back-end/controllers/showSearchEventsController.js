
import {getSearchEventsModel} from "../models/getSearchEvents.js";
export async function showSearchEvents(req, res){
    try {
        const {searchParam} = req.query; //query after ?
        const responseModel = await getSearchEventsModel(searchParam);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
    
    
}