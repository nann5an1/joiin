import createdEventsData from "../models/getCreatedEventsData.js";

export async function showCreatedEvents(req, res){
    console.log("showCreatedEvents is running");
    try {
        const result = await createdEventsData();
        res.status(200).json(result);   //if the response okay send the json result
    } catch (error) {
        res.status(500).json(error);
    }
}