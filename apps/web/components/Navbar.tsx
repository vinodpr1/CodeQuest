"use client";
import {
  Code2,
  Github,
  HelpCircle,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "../src/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { cn } from "app/lib/utils";

const Navbar = () => {
  const { data, status } = useSession();
  const isLoading = status == "loading" ? true : false;

  const [menubar, setMenuBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuBar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

              {!isLoading && !data?.user && (
                <Button
                  onClick={() => signIn()}
                  variant={"outline"}
                  className="cursor-pointer rounded hover:bg-gray-300 transition-all duration-300"
                >
                  Sign In
                </Button>
              )}

              {!isLoading && data?.user && 
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="overflow-hidden rounded-full border-2 border-transparent profile-avatar focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={() => setShowDropdown(!showDropdown)}
                      aria-label="User menu"
                    >
                      <img
                        src="https://ui-avatars.com/api/?name=User&background=random"
                        alt="User"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </button>
                    {
                      showDropdown &&
                      <div
                      className= "absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 bg-popover text-popover-foreground"
                      style={{
                        transformOrigin: "top right",
                      }}
                    >
                      <div className="p-1 rounded-md">
                        {/* First Section */}
                        <div className="px-1 py-1 space-y-1">
                          <button
                            className="flex cursor-pointer w-full items-center gap-2 rounded-md px-3 py-2 text-sm menu-item"
                            onClick={() => {
                              setShowDropdown(false);
                              //   navigate("/profile");
                            }}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </button>
                        </div>

                        {/* Separator */}
                        <div className="my-1 h-px bg-border" />

                        {/* Second Section */}
                        <div className="px-1 py-1 space-y-1">
                          <button
                            className="flex cursor-pointer w-full items-center gap-2 rounded-md px-3 py-2 text-sm menu-item"
                            onClick={() => {
                              setShowDropdown(false);
                              //   navigate("/help");
                            }}
                          >
                            <HelpCircle className="h-4 w-4" />
                            Help Center
                          </button>
                        </div>

                        {/* Separator */}
                        <div className="my-1 h-px bg-border" />

                        <div className="px-1 py-1">
                          <button
                            className="flex cursor-pointer w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 menu-item"
                            onClick={()=>signOut()}
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                      </div>
                     }
                  </div>
                  }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
