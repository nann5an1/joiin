import {deleteAccountModel} from "../models/deleteAccountModel.js";

export async function deleteAccountController(req, res){
    try {
        const response = await deleteAccountModel(req.user.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}