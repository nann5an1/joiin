import {fetchEventCountModel} from "../models/fetchEventCountModel.js";

export async function fetchEventCountController(req, res){
    try {
        console.log("request user id: ", req.user.id);
        const data_model = await fetchEventCountModel(req.user.id);
        res.status(200).json(data_model);
    } catch (error) {
        res.status(500).json(error);
    }
    
}