const handleCreateEvent = require("../controllers/handleCreateEvent.js");
const express = require("express");
const router = express.Router();


router.post("/create", handleCreateEvent);
//     {
//     try {
//         console.log("Full Request body\n", req.body);
//         const {title, category, desc, img, location, org_name, org_email, org_phone, start_date, end_date, status, tags} = req.body;
        
//         console.log(`Event created with:
//                     Event Title: ${title}
//                     Cateogry: ${category}
//                     Description: ${desc}
//                     Image: ${img}
//                     Location: ${location}
//                     Org Name: ${org_name}
//                     Org Email: ${org_email}
//                     Org Phone: ${org_phone}
//                     Start Date: ${start_date}
//                     End Date: ${end_date}
//                     Status: ${status}
//                     Items Required: ${[tags]}
//                     `);
//     } catch (error) {
//         console.log("error in responding for creating events");
//     }
// });

router.post("/yourevents", (req, res) => {
    try {
        // console.log(res.getHeader());
        console.log("Your events tab");
    } catch (error) {
         console.log("error in responding for your events");
    }
});

module.exports = router;