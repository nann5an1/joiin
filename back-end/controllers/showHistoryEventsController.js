import getHistoryEventsModel from "../models/getHistoryEvents.js";

export async function showHistoryEvents(req, res){
    try {
        console.log("userid  check for history events", req.user.id);
        const events = await getHistoryEventsModel(req.user.id);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json(error);
    }
}