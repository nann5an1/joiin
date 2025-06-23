//constroller will be calling from the model, which has the database logic

// const express = require("express");
const insertFormData = require("../models/insertFormData.js");
// const router = express.Router();

export async function createEvent(req, res){
    try {
        const result = await insertFormData(req.body);
        res.status(201).json({"message created": result});
    } catch (error) {
        res.status(500).json("error in responding for creating events");
    }
}