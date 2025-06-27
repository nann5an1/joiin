import {signUpModel} from "../models/insertSignUpInfo.js";

export async function signUpController(req, res) {
    try {
        console.log(req.body);
        const result = await signUpModel(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}