import createdEventsData from "../models/getCreatedEventsData.js";

export async function organizerCreatedEvents(req, res){
    // console.log("showCreatedEvents is running");
    try {
        const result = await createdEventsData(); //pass the user id to the model
        res.status(200).json(result);   //if the response okay send the json result
    } catch (error) {
        res.status(500).json(error);
    }
}