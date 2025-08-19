import { ICourseModule } from "./course-module";

export interface ILecture {
  _id: string;
  lectureTitle: string;
  lectureNumber: number;
  module: ICourseModule;
  videoURL: string;
  pdfUrls: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
