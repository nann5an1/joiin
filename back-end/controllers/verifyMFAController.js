import {verifyMFAModel} from '../models/verifyMFAModel.js'

export async function verifyMFA(req, res){
    try {
        const responseModel = await verifyMFAModel(req.user.id, req.query.token);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
}