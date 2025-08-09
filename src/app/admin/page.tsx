"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import JobCard from "@/components/ui/JobCard"
import NoItems from "@/components/Noitems"

type Job = {
  _id: string;
  url: string;
  status: string;
  isCompleted: boolean;
  remark: string
  link:string
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>();
  
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const fetchJob = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
        });

        const data = await response.json();
        console.log(data.job)
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

        setJobs(data.job);
        toast.success(`Jobs fetching success!`, {
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
        console.error("Error fetching jobs:", err);
        toast.error(`Jobs fetching failed!`, {
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

    fetchJob();
  }, []);
  if (!jobs || jobs.length === 0) return <NoItems />;
  return (
    <div className="bg-black flex flex-col items-center text-white">
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-70 lg:w-100 fixed mt-20 z-0">
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
        className="text-3xl lg:text-6xl font-bold mt-15 z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Admin Panel
      </motion.div>
      <div className="flex flex-col gap-4 my-15">
        {
          jobs?.map((jobx,idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.2 }}
              className="w-full"
            >
            <JobCard
              _id={jobx._id}
              url={jobx.url}
              status={jobx.status}
              isCompleted={jobx.isCompleted}
              remark={jobx.remark}
              link={jobx.link}
            />
            </motion.div>
          ))
        }
        
      </div>
    </div>
  );
}