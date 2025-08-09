"use client"

import { Card } from "@/components/ui/card"
import {Globe} from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import NoItems from "@/components/Noitems"
type Report = {
  _id: string;
  url: string;
  status: string;
  isCompleted: boolean;
  remark: string;
  link: string;
};

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const fetchReports = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/fetch`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(`Error fetching reports!`, {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",            
                WebkitBackdropFilter: "blur(16px)",   
                border:"0" ,     
                color:"white"
            },
                position:'top-center'
            });
          throw new Error(data.message || "Failed to fetch reports");
        }

        setReports(data.reports);
        toast.success(`Report fetching success!`, {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",            
                WebkitBackdropFilter: "blur(16px)",   
                border:"0" ,     
                color:"white"
            },
                position:'top-center'
            });
      } catch (err) {
        console.error("Error fetching reports:", err);
        toast.error(`Reports fetching failed!`, {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",            
                WebkitBackdropFilter: "blur(16px)",   
                border:"0" ,     
                color:"white"
            },
                position:'top-center'
            });
      }
    };

    fetchReports();
  }, []);
  if (!reports || reports.length === 0) return <NoItems />;
  const getStatusColor = (status: string) => {
  switch (status) {
    case 'Submitted':
      return 'bg-yellow-200/35';
    case 'Processing':
      return 'bg-blue-300/35';
    case 'Completed':
      return 'bg-green-200/35';
    case 'Cancelled':
      return 'bg-red-400/30';
    default:
      return 'bg-gray-400/30';
  }
};
  return (
    <div className="bg-black flex flex-col items-center text-white">
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-70 lg:w-100 fixed mt-20">
            <motion.path
                d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4 M14 13.12c0 2.38 0 6.38-1 8.88 M17.29 21.02c.12-.6.43-2.3.5-3.02 M2 12a10 10 0 0 1 18-6 M2 16h.01 M21.8 16c.2-2 .131-5.354 0-6 M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2 M8.65 22c.21-.66.45-1.32.57-2 M9 6.8a6 6 0 0 1 9 5.2v2" // actual path from Menu icon
                strokeWidth="2"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.6 }}
                transition={{ duration: 5 }}
            />
            </motion.svg>    
      <motion.div 
        className="text-6xl font-bold mt-15 z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Reports
      </motion.div>
      <div className="flex flex-col gap-4 my-15">
        { 
          reports.map((report,idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.2 }}
            >
              <Card className="w-[90vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] bg-white/10 backdrop-blur-md text-white border-0 shadow-gray-800 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between mx-5">
                <div className="flex flex-col gap-5 ">
                    <span className="flex gap-2"><Globe /> {report.url}</span>
                    <span className="font-bold">Status : <span className={`${getStatusColor(report.status)} backdrop-blur-lg text-white p-2 px-5 rounded-xl font-bold`}>{report.status}</span></span>
                    <span className="font-bold">Remark :  {report.remark}</span>
                </div>     
                {report.isCompleted && (
                  <span className="flex items-center justify-center mt-4 md:mt-0">
                    <button className="px-4 py-1 rounded-lg bg-white/10 backdrop-blur-md cursor-pointer" onClick={() => {window.location.href = report.link}}>Download</button>  
                  </span>
                )}
            </div>
        </Card>
            </motion.div>
          ))
        }
        
      </div>
    </div>
  );
}
