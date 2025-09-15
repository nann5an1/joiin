
import { getEventDetailsModel } from "../models/getEventDetailsModel.js";
export async function showEventDetails(req, res){
    try {
        console.log("query: ", req.query);
        const responseModel = await getEventDetailsModel(req.query.event_id);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
}