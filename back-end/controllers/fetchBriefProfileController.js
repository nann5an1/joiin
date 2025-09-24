import {fetchBriefProfileModel} from "../models/fetchBriefProfileModel.js";

export async function fetchBriefProfileController(req, res){
    try {
        const data = await fetchBriefProfileModel(req.user.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}