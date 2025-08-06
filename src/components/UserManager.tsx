"use client";

import { useState, useEffect } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card , CardHeader, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { UserCog,LogOut } from "lucide-react"
import { toast } from "sonner"

interface User {
  email: string,
  name: string,
  givenName: string,
  familyName: string,
  picture: string
}

const UserManager = () => {
  const [isClick, setIsClick] = useState(false);
  const [User,setUser] = useState<User | null>(null);

  useEffect(() => {
    // Access localStorage only on client side
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo') || null;
      if (userInfo) {
        setUser(JSON.parse(userInfo) as User);
      }
    }
  }, []);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential received");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
        credentials: "include",
      });

      if (response.ok){
        const data = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(data.payload));
        setUser(data.payload);

        toast.success(`Hey ${data?.payload.name || null }, Welcome !`, {
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",            
            WebkitBackdropFilter: "blur(16px)",   
            border:"0" ,     
            color:"white"
          },
          position:'top-center'
        });
      } else {
        alert("login failed please try after some time")
      }
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleError = () => {
    toast.error("Google login failed!", {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      action: {
        label: "Login",
        onClick: () => {
          window.location.href = "/login";
        },
      },
      actionButtonStyle:{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      position:'top-center'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null)
    setIsClick(false)
    toast.success(`Logged out Successfully!`, {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      position:'top-center'
    });
  };
    
  return (
        <div className="cursor-pointer flex flex-col items-center gap-2 relative">
          <Avatar className="w-9 h-9" onClick={() => setIsClick(!isClick)}>
            <AvatarImage src={User?.picture || "https://avatars.githubusercontent.com/u/197718854"} alt="user pic" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {isClick && ( 
            <Card className="absolute top-[3rem] -right-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl transition hover:scale-[1.01] duration-300 z-10 w-60 text-white">
                <CardHeader className="w-full flex">
                    <Avatar className="w-9 h-9 my-4">
                        <AvatarImage src={User?.picture || "https://avatars.githubusercontent.com/u/197718854"} alt="user pic" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col my-auto">
                        <span className="text-sm font-bold">{User?.name || "UserName"}</span>
                        <span className="text-sm">{User?.email || "User Mail"}</span>
                    </div>
                </CardHeader>
                <Separator className="relative -mt-6"/>
                <CardContent className="relative -mt-2 flex flex-col">
                    <span className="p-2 text-sm flex gap-2">
                      <span>
                        <UserCog />
                      </span>
                      <span>Manage Account</span>
                    </span>
                    
                    {
                      User ? (<button className="bg-pink-500/20 backdrop-blur-lg py-2 mx-4 rounded-xl mt-2 font-bold flex justify-center gap-2" onClick={handleLogout}><LogOut />Logout</button>)
                      : (
                        <div className="py-5 text-red-500"><GoogleLogin onSuccess={handleSuccess} onError={handleError} /></div>
                      )
                    }
                </CardContent>
            </Card>
          )}
        </div>
  );
};

export default UserManager;
