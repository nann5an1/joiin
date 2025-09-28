import {updatePasswordModel} from "../models/updatePasswordModel.js";


export async function updatePasswordController(req, res){
    try {
        const res_model = await updatePasswordModel(req.user.id, req.body.currentPassword, req.body.newPassword);
        res.status(200).json(res_model);
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
}