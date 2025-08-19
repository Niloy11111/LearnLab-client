import { IProduct } from "./product";

export interface ICourseModule {
  _id: string;
  moduleTitle: string;
  moduleNumber: number;
  course: IProduct;
  createdAt?: Date;
  updatedAt?: Date;
}
