"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card"
import {Globe} from "lucide-react"

type JobProps = {
  _id: string;
  url: string;
  status: string;
  isCompleted: boolean;
  remark: string;
  link: string
};

export default function JobCard({ _id, url, status, remark, isCompleted, link}: JobProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localStatus, setLocalStatus] = useState<string>(status);
  const [localRemark, setLocalRemark] = useState<string>(remark ?? "");
  const [localisCompleted,setLocalIsCompleted] = useState<boolean>(isCompleted);
  const [localLink,setLocallink] = useState<string>(link ?? "");

  const handleSave = async () => {
    const response = 
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          _id: _id,
          url: url,
          status: localStatus,
          remark: localRemark,
          isCompleted: localisCompleted,
          link: localLink
        }),
      });
    const data = await response.json();
    console.log(data)
    console.log("Saved data:", { localStatus, localRemark });
    setIsEditing(false);
  };

  return (
    <div className="z-1">   
      {isEditing ? (
        
          <Card className="w-[90vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] bg-white/10 backdrop-blur-md text-white border-0 shadow-gray-800 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between mx-10">
                    <div className="flex flex-col gap-5 ">
                      <span className="flex gap-4"><Globe /> {url}</span>
                      <span className="font-bold">
                          Status
                          <div className="flex flex-col md:flex-row  gap-2 ">
                            {["Completed", "Processing", "Submitted"].map((option) => (
                              <label key={option} className="flex items-center gap-2 text-white ">
                                <input
                                  type="radio"
                                  name="status"
                                  value={option}
                                  checked={localStatus === option}
                                  onChange={() => setLocalStatus(option)}
                                  className="accent-gray-500"
                                />
                                <span className="font-semibold">{option}</span>
                              </label>
                            ))}
                          </div>
                        </span>
                        <div className="flex gap-5 items-center">
                          <span className="text-white font-semibold">Completed:</span>
                          <button
                            onClick={(e) => {setLocalIsCompleted(!localisCompleted)}}
                            className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${
                              localisCompleted  ? "bg-green-500" : "bg-gray-500"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                localisCompleted  ? "translate-x-8" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span className="text-white font-mono">{localisCompleted ? "true" : "false"}</span>
                        </div>
                        <span className="font-bold">
                            Remark
                            <input 
                            className="bg-gray-500/30 backdrop-blur-lg text-white p-2 rounded-xl mt-2 ml-2 font-bold" 
                            placeholder={remark} 
                            value={localRemark}
                            onChange={(e) => setLocalRemark(e.target.value)}
                            />
                        </span>
                        <span className="font-bold">
                            Link
                            <input 
                            className="bg-gray-500/30 backdrop-blur-lg text-white p-2 rounded-xl mt-2 ml-2 font-bold" 
                            placeholder={localLink} 
                            value={localLink}
                            onChange={(e) => setLocallink(e.target.value)}
                            />
                        </span>
                    </div>
                    <span className="flex items-center justify-center mt-4 md:mt-0">
                      <button className="px-4 py-1 rounded-lg bg-white/10 backdrop-blur-md cursor-pointer" onClick={handleSave}>Save</button>  
                    </span>
                </div>
            </Card>
        
      ) : (
         <Card className="w-[90vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw] bg-white/10 backdrop-blur-md text-white border-0 shadow-gray-800 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between mx-5">
                <div className="flex flex-col gap-5 ">
                    <span className="flex gap-2"><Globe /> {url}</span>
                    <span className="font-bold">Status : <span className="bg-gray-500/30 backdrop-blur-lg text-white p-2 rounded-xl font-bold">{localStatus}</span></span>
                    <span className="font-bold">Remark :  {localRemark}</span>
                </div>     
                <span className="flex items-center justify-center mt-4 md:mt-0">
                  <button className="px-4 py-1 rounded-lg bg-white/10 backdrop-blur-md cursor-pointer" onClick={() => setIsEditing(true)}>Edit</button>  
                </span>
            </div>
        </Card>
      )}
    </div>
  );
}
