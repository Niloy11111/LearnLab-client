export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "admin" | "landlord" | "tenant";
  phoneNumber: string;
  iat?: number;
  exp?: number;
  //
  photo?: string;
  _id?: string | undefined;
}
