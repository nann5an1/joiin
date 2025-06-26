//eventRoute.js Router file
import { createEvent } from "../controllers/handleCreateEvent.js"; //handleCreateEvent from "../controllers/handleCreateEvent.js";
import { showCreatedEvents } from "../controllers/showCreatedEvents.js";
import { Router } from "express";
const router = Router();


router.post("/create", createEvent);
router.get("/yourevents", showCreatedEvents);

export default router;