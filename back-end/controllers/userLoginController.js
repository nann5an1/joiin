import {loginModel} from "../models/loginModel.js";

export async function loginController(req, res) {
    try {
        console.log(req.body);
        const result = await loginModel(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}