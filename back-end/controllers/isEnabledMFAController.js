import { isEnabledMFAModel } from "../models/isEnabledMFAModel.js";

export async function isEnabledMFA(req, res) {
    try {
        const response = await isEnabledMFAModel(req.user.id);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in isEnabledMFAController:", error);
        res.status(500).json({
            success: false,
            message: "Failed to check MFA status",
            error: error.message
        });
    }
}