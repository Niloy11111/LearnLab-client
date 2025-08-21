"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import { selectCurrentUser, setUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/services/AuthService";
import { Bell, Mail, MessageCircle, Phone, SearchCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const Navbar = () => {
  const userInfo = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState(0);
  const isDashboardPage = pathname.includes("/admin");

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/";

    dispatch(setUser({ user: null, token: null }));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full  text-sm">
      <div className=" shadow-xl bg-secondary-500 text-white">
        <div
          className=" customWidth  items-center "
          style={{ height: `${NAVBAR_HEIGHT}px ` }}
        >
          <div className="flex md:justify-between justify-center h-full items-center md:customWidth">
            {!isDashboardPage && (
              <>
                <div className="md:flex gap-5  items-center   hidden ">
                  <p className="font-semibold lg:flex items-center gap-1  hidden ">
                    <Phone className="w-[16px]" />{" "}
                    <span>+9 (681) 843-4596</span>
                  </p>
                  <p className="font-semibold lg:flex items-center gap-1 hidden ">
                    <Mail className="w-[16px]" /> <span>info@LearnLab.com</span>
                  </p>
                </div>
                <div className="md:flex items-center   hidden ">
                  <p className="font-semibold hidden lg:flex gap-1 items-center">
                    {/* Discover your perfect rental apartment with our advanced search
                     */}
                    <SearchCheck className="w-[20px]" />{" "}
                    <span>
                      Find your ideal course quickly and easily with our
                      interactive learning platform
                    </span>
                  </p>
                </div>

                {/* mobile */}

                <div className={`md:hidden flex    items-center gap-8   `}>
                  <Link href="/" className="md:mr-0 sm:mr-5">
                    {" "}
                    <button
                      className={`${
                        pathname === "/" ? "navBtnActive" : "navBtn"
                      }`}
                    >
                      Home
                    </button>
                  </Link>
                  <Link href="/courses" className="md:mr-0 sm:mr-5">
                    {" "}
                    <button
                      className={`${
                        pathname === "/courses" ? "navBtnActive" : "navBtn"
                      }`}
                    >
                      Courses
                    </button>
                  </Link>

                  <Link href="/contact-us" className="md:mr-0 sm:mr-5">
                    {" "}
                    <button
                      className={`${
                        pathname === "/contact-us" ? "navBtnActive" : "navBtn"
                      }`}
                    >
                      Contact Us
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          scrollY > 30
            ? "border-b-2 border-b1 w-full fixed top-0 left-0  z-50  "
            : ""
        }  bg-white   h-[95px] flex justify-between  `}
      >
        <div className="customWidth flex justify-between items-center  ">
          <div className="flex items-center gap-4 md:gap-6">
            {isDashboardPage && (
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            )}

            <Link href="/" className="cursor-pointer" scroll={false}>
              <div className=" flex items-center gap-3">
                {/* <Image
                  src="/logo.svg"
                  alt="LearnLab Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 "
                /> */}
                <div className="text-xl font-bold">
                  Learn
                  <span className=" font-light ">Lab</span>
                </div>
              </div>
            </Link>
          </div>
          {!isDashboardPage && (
            <>
              <div className={`hidden  mt-3 md:flex  items-center gap-8   `}>
                <Link href="/" className="md:mr-0 sm:mr-5">
                  {" "}
                  <button
                    className={`${
                      pathname === "/" ? "navBtnActive" : "navBtn"
                    }`}
                  >
                    Home
                  </button>
                </Link>
                <Link href="/courses" className="md:mr-0 sm:mr-5">
                  {" "}
                  <button
                    className={`${
                      pathname === "/courses" ? "navBtnActive" : "navBtn"
                    }`}
                  >
                    Courses
                  </button>
                </Link>

                <Link href="/contact-us" className="md:mr-0 sm:mr-5">
                  {" "}
                  <button
                    className={`${
                      pathname === "/contact-us" ? "navBtnActive" : "navBtn"
                    }`}
                  >
                    Contact Us
                  </button>
                </Link>
              </div>
            </>
          )}

          <div className="flex items-center gap-5 ">
            {userInfo ? (
              <>
                <div className="relative hidden md:block">
                  <MessageCircle className="w-6 h-6 cursor-pointer text-secondary-600 hover:text-primary-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-600 rounded-full"></span>
                </div>
                <div className="relative hidden md:block">
                  <Bell className="w-6 h-6 cursor-pointer text-secondary-600 hover:text-primary-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-600 rounded-full"></span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                    <p className=" block md:hidden mr-1">{userInfo?.name}</p>
                    <Avatar>
                      {/* <AvatarImage src={userInfo.userInfo?.image} /> */}
                      <AvatarFallback
                        className="bg-primary-600 text-white
                      "
                      >
                        {userInfo.role?.[0].toUpperCase()}
                      </AvatarFallback>
                      <AvatarImage src={userInfo?.photo} />
                    </Avatar>

                    <p className=" hidden md:block">{userInfo?.name}</p>
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
                      Courses
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
                    className=" hover:bg-secondary-500 text-secondary-600  border-secondary-600 bg-transparent hover:text-white "
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="secondary"
                    className="text-white bg-secondary-500  hover:text-primary-700 "
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
