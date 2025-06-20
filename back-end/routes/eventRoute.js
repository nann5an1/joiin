const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
    try {
        console.log(res.getHeader());
    } catch (error) {
        console.log("error in responding for creating events");
    }
});

router.post("/yourevents", (req, res) => {
    try {
        console.log(res.getHeader());
        console.log("Your events tab");
    } catch (error) {
         console.log("error in responding for your events");
    }
});

module.exports = router;