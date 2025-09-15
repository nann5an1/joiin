import {attendEventsModel} from '../models/attendEventsModel.js'

export async function addAttendingEvents(req, res) {
    try {
        const {event_id} = req.query;
        console.log("event id in controller: ", event_id);
        const modelResponse = await attendEventsModel(req.user.id, event_id);
        res.status(200).json(modelResponse);
    } catch (error) {
        res.status(500).json(error);
    }
}