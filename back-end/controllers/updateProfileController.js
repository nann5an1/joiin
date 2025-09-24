import {updateProfileModel} from "../models/updateProfileModel.js"

export async function updateProfileController(req, res){
    try {
        const data = await updateProfileModel(req.user.id, req.query.username);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}