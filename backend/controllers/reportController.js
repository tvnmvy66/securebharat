import Report from '../models/report.js'
import jwt from "jsonwebtoken"

export const createReport = async (req, res) => {
    const { url } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }
    const token = authHeader.split(' ')[1];

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded._id;
    } catch (err) {
        console.log(err);
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    if (!url || url.length > 66) {
        return res.status(400).json({
        success: false,
        message: "URL must be 66 characters or fewer.",
        });
    }

    try {
        const report = {
            user : userId,
            url : url,
            status : "Submitted",
            isCompleted : false
        }
        await Report.create(report)
        return res.status(201).json({
        success: true,
        message: "Report created successfully",
        url: url,
        });
    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({
        success: false,
        message: "Something went wrong while creating the report.",
        });
    }
}

export const fetchReport = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }
    const token = authHeader.split(' ')[1];

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded._id;
    } catch (err) {
        console.log(err);
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    try {
        const reports = await Report.find({ user: userId })
        return res.status(200).json({
            success: true,
            message: "Report created successfully",
            reports : reports.reverse()
        });
    } catch (error) {
        console.error("Error fetching report:", error);
        return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the reports.",
        });
    }

}