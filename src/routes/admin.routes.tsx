import { BookPlus, House, Landmark, User } from "lucide-react";
export const adminPaths = [
  {
    title: "My Profile",
    url: "/admin/profile",
    icon: User,
  },
  {
    title: "View Courses",
    url: "/admin/courses",
    icon: BookPlus,
  },
  {
    title: "Lectures",
    url: "/admin/manage-lectures",
    icon: Landmark,
  },

  {
    title: "Go Home",
    url: "/",
    icon: House,
  },
];
