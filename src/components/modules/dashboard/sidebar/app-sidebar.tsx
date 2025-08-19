"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { adminPaths } from "@/routes/admin.routes";
import { userPaths } from "@/routes/user.routes";

import { getCurrentUser } from "@/services/AuthService";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AppSidebar() {
  const { user, setUser } = useUser();

  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const userRole = {
    ADMIN: "admin",
    USER: "user",
  };

  let sidebarItems;

  if (!user || !user.role) {
    console.log("User role not found");
    return null; // or return a loading state
  } else {
    switch (user?.role?.toLowerCase()) {
      case userRole.ADMIN:
        sidebarItems = adminPaths;
        break;
      case userRole.USER:
        sidebarItems = userPaths;
        break;
      default:
        console.log("Role not found or undefined.");
        break;
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {user?.role === "admin"
                      ? "Admin View"
                      : user?.role === "user"
                      ? "User View"
                      : "User View"}
                  </h1>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </>
              ) : (
                <button
                  className="hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => toggleSidebar()}
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {sidebarItems?.map((link, index) => {
            const isActive = pathname === link.url;

            return (
              <SidebarMenuItem key={link.url}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-7 py-7 rounded-none",
                    isActive
                      ? "bg-gray-100"
                      : "text-gray-600 hover:bg-gray-100",
                    open ? "text-primary" : "ml-[5px]"
                  )}
                >
                  <Link href={link.url} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`${
                          !open && (index === 2 || index === 3)
                            ? "h-3 w-3"
                            : "h-5 w-5"
                        } ${isActive ? "text-primary" : "text-gray-600"}`}
                      />

                      <span
                        className={`font-medium ${
                          isActive ? "text-primary" : "text-gray-600"
                        }`}
                      >
                        {link.title}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
