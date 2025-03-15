"use client";
import { Code2, Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../src/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();
  const isLoading = status == "loading" ? true : false;
  console.log("d", data);

  const [menubar, setMenuBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuBar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm border-b px-6 md:px-4 border-slate-800 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="font-semibold">
            <Link href={"/"} className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 w-8 h-8 flex items-center justify-center rounded">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-tr from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                CodeQuest
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Problems
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contests
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Leaderboard
              </a>
              
                {  
                   !isLoading && !data?.user &&
                   <Button
                     onClick={() => signIn()}
                     variant={"outline"}
                     className="cursor-pointer rounded hover:bg-gray-300 transition-all duration-300"
                   >
                     Sign In
                   </Button>
                }

                {  
                   !isLoading && data?.user &&
                   <Button
                     onClick={() => signOut()}
                     variant={"outline"}
                     className="cursor-pointer rounded hover:bg-gray-300 transition-all duration-300"
                   >
                     Log out
                   </Button>
                }
     
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
