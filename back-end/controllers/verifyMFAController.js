import {verifyMFAModel} from '../models/verifyMFAModel.js'

export async function verifyMFA(req, res){
    try {
        console.log("request token: ", req.query.token);
        console.log("request user id: ", req.query.user_id);
        const responseModel = await verifyMFAModel(req.query.user_id, req.query.token);
        res.status(200).json(responseModel);
    } catch (error) {
        res.status(500).json(error);
    }
}