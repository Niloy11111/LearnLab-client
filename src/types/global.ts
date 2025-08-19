import { AddCourseFormData } from "@/lib/schemas";
import { MotionProps as OriginalMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { IApplication, IProduct } from "./product";
import { IUser } from "./user";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export interface PropertyOverviewProps {
  propertyId: string;
}

export interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApplication?: IApplication;
  propertyId?: string;
}

export interface ContactWidgetProps {
  onOpenModal: () => void;
}

export interface ImagePreviewsProps {
  images: string[];
}

export interface ApplicationCardProps {
  application: Record<string, any>;
  children: React.ReactNode;
}

export interface CardProps {
  property: IProduct;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  showFavoriteButton?: boolean;
  propertyLink?: string;
}

export interface CardCompactProps {
  property: IProduct;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  showFavoriteButton?: boolean;
  propertyLink?: string;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export interface NavbarProps {
  isDashboard: boolean;
}

// export interface
// Props {
//   userType: "manager" | "tenant";
// }

export interface AddCourseFormProps {
  onSubmit: (
    data: AddCourseFormData,
    imageFiles: File[],
    resetForm: () => void
  ) => Promise<void>;
  // userType: "admin" | "user" | undefined;
}

export interface User {
  userInfo: IUser;
  userRole: "tenant" | "admin" | "landlord";
}
