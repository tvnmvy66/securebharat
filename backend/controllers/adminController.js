import Report from '../models/report.js'
import jwt from "jsonwebtoken"


export const fetchJobs = async (req, res) => {
    const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token" });
        }
        const token = authHeader.split(' ')[1];
    
        let userRole = "user";
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            console.log(err);
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }
    if (userRole == undefined || userRole == "user") return res.status(403).json({ success: false, message: "Invalid role" });
    try {
        const reports = await Report.find({})
        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            job : reports.reverse()
        });
    } catch (error) {
        console.error("Error fetching report:", error);
        return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the reports.",
        });
    }

}

export const editJobs = async (req, res)  => {
    const authHeader = req.headers.authorization;
    const { _id, url, status, remark, isCompleted, link} = req.body;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token" });
        }
        const token = authHeader.split(' ')[1];
    
        let userRole = "user";
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            console.log(err);
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }
    if (!userRole || userRole == "user") return res.status(403).json({ success: false, message: "Invalid role" });
    if (!url || url.length > 66) {
        return res.status(400).json({
        success: false,
        message: "URL must be 66 characters or fewer.",
        });
    }
    try {
    const updatedJob = await Report.findByIdAndUpdate(
        _id,
        {
            url,
            status,
            remark,
            isCompleted,
            link,
        },
        { new: true } 
        );

        if (!updatedJob) {
        return res.status(404).json({ success: false, message: "Job not found" });
        }

        return res.status(200).json({ success: true, message: "Job updated"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }

}