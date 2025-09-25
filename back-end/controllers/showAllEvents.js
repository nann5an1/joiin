
import {recentActivitiesModel} from "../models/getRecentActivities.js"; // Import the model for recent activities
import {defaultActivitiesModel} from "../models/getDefaultActivities.js";
import {freeActivitiesModel} from "../models/getFreeActivitiesModel.js"
export async function showAllEvents(req, res) {
    let response;
    //  console.log("=== showAllEvents called ==="); // Add this line first
    const {recent, nearest, popular, free, all} =  req.query; //req.query will return the query parameters from the URL, which is after the ? in the URL
    // console.log("Query parameters received:", {recent, nearest, popular, free});
    try {
        if(recent)
            response =  await recentActivitiesModel();
        if(all)
            response = await defaultActivitiesModel();
        if(free) response = await freeActivitiesModel();
        // console.log("Response from recentActivitiesModel:", response);
        res.status(200).json(response);
    } catch (error) {
         res.status(500).json(error);
    }
    
}