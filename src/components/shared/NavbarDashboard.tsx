"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import { selectCurrentUser, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/services/AuthService";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
// import { SidebarTrigger } from "./ui/sidebar";

const NavbarDashboard = () => {
  // const { user: userInfo, isLoading } = useUser();
  const userInfo = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  // console.log("here userinfo", userInfo);
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage = pathname.includes("/admin");

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/";
    dispatch(setUser({ user: null, token: null }));
  };

  // console.log("userInfo", userInfo?.role);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 "
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}

          <Link
            href="/"
            className="cursor-pointer hover:!text-primary-300"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt=" Logo"
                width={24}
                height={24}
                className="w-6 h-6 "
              />
              <div className="text-xl font-bold">
                Learn
                <span className="text-secondary-500 font-light hover:!text-primary-300">
                  Lab
                </span>
              </div>
            </div>
          </Link>
          {isDashboardPage && userInfo && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
              onClick={() =>
                router.push(
                  userInfo.role?.toLowerCase() === "admin"
                    ? "/admin/list/course/add-course"
                    : "/courses"
                )
              }
            >
              {userInfo.role?.toLowerCase() === "admin" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add New Course</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
        {!isDashboardPage && (
          <div className="md:flex items-center gap-5  hidden ">
            <p className="text-primary-200 hidden lg:block"></p>
            <Link href="/courses" className="md:mr-0 sm:mr-5">
              {" "}
              <Button variant="outline">Properties</Button>
            </Link>
            <Link href="/our-story">
              <Button variant="outline">Our Story</Button>
            </Link>
          </div>
        )}
        <div className="flex items-center gap-5">
          {userInfo ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>
              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    {/* <AvatarImage src={userInfo.userInfo?.image} /> */}
                    <AvatarFallback className="bg-primary-600">
                      {userInfo.role?.[0].toUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={userInfo?.photo} />
                  </Avatar>

                  <p className="text-primary-200 hidden md:block">
                    {userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem
                    className="cursor-pointer sm:hidden block hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                    onClick={() =>
                      router.push(
                        userInfo?.role?.toLowerCase() === "admin"
                          ? "/admin/users"
                          : userInfo?.role?.toLowerCase() === "landlord"
                          ? "/landlord/list/rental"
                          : "/tenant/applications",
                        { scroll: false }
                      )
                    }
                  >
                    Properties
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer sm:hidden block hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                    onClick={() =>
                      router.push(
                        userInfo?.role?.toLowerCase() === "admin"
                          ? "/admin/users"
                          : userInfo?.role?.toLowerCase() === "landlord"
                          ? "/landlord/list/rental"
                          : "/tenant/applications",
                        { scroll: false }
                      )
                    }
                  >
                    Our Story
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                    onClick={() =>
                      router.push(
                        userInfo?.role?.toLowerCase() === "admin"
                          ? "/admin/courses"
                          : "/",
                        { scroll: false }
                      )
                    }
                  >
                    Go to Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />

                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 "
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="secondary"
                  className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 "
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
