type Specification = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
};

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
  isActive: boolean;
  numberOfReviews: number;
  averageRating?: number;
  ratingCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// interface IProduct {
//   id: number;
//   name: string;
//   description: string;
//   pricePerMonth: number;
//   securityDeposit: number;
//   applicationFee: number;
//   photoUrls: string[];
//   amenities: Amenity[];
//   highlights: Highlight[];
//   isPetsAllowed: boolean;
//   isParkingIncluded: boolean;
//   beds: number;
//   baths: number;
//   squareFeet: number;
//   propertyType: PropertyType;
//   postedDate: Date;
//   averageRating?: number;
//   numberOfReviews?: number;
//   locationId: number;
//   managerCognitoId: string;
//   location: ILocation;
//   manager: IManager;
//   leases: ILease[];
//   applications: IApplication[];
//   favoritedBy: ITenant[];
//   tenants: ITenant[];
// }

export interface IManager {
  id: number;
  cognitoId?: string;
  name: string;
  email: string;
  phoneNumber: string;
  managedProperties: IProduct[];
}

export interface ITenant {
  id: number;
  cognitoId?: string;
  name: string;
  email: string;
  phoneNumber: string;
  properties: IProduct[];
  favorites: IProduct[];
  applications: IApplication[];
  leases: ILease[];
}

export interface ILocation {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: string;
  properties: IProduct[];
}

export interface IApplication {
  id: number;
  applicationDate: Date;
  status: ApplicationStatus;
  property: Record<string, any>;
  landlordContactNumber: string;
  tenant: Record<string, any>;
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  leaseId?: number;
  startDate: Date;
  endDate: Date;

  // for solve error

  _id?: string;
  // _id?: string | undefined;
}

export interface ILease {
  id: number;
  startDate: Date;
  endDate: Date;
  rent: number;
  deposit: number;
  propertyId: number;
  tenantCognitoId: string;
  applicationId?: number;
  payments: IPayment[];
}

export interface IPayment {
  id: number;
  amountDue: number;
  amountPaid: number;
  dueDate: Date;
  paymentDate: Date;
  paymentStatus: PaymentStatus;
  leaseId: number;
}

// enum Amenity {
//   WasherDryer,
//   AirConditioning,
//   Dishwasher,
//   HighSpeedInternet,
//   HardwoodFloors,
//   WalkInClosets,
//   Microwave,
//   Refrigerator,
//   Pool,
//   Gym,
//   Parking,
//   PetsAllowed,
//   WiFi,
// }

// enum Highlight {
//   HighSpeedInternetAccess,
//   WasherDryer,
//   AirConditioning,
//   Heating,
//   SmokeFree,
//   CableReady,
//   SatelliteTV,
//   DoubleVanities,
//   TubShower,
//   Intercom,
//   SprinklerSystem,
//   RecentlyRenovated,
//   CloseToTransit,
//   GreatView,
//   QuietNeighborhood,
// }

// enum PropertyType {
//   Rooms,
//   Tinyhouse,
//   Apartment,
//   Villa,
//   Townhouse,
//   Cottage,
// }

enum ApplicationStatus {
  Pending = "Pending",
  Denied = "Denied",
  Approved = "Approved",
}

enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
  // PartiallyPaid = "PartiallyPaid",
  // Overdue = "Overdue",
}
