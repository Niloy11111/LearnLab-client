import { ICourseModule } from "@/types/course-module";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

type TLectureState = {
  lecture: null | ILecture;
};

const initialState: TLectureState = {
  lecture: null,
};

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLecture: (state, action: PayloadAction<ILecture>) => {
      state.lecture = action.payload;
    },
  },
});

export const { setLecture } = lectureSlice.actions;

export default lectureSlice.reducer;

export const selectCurrentLecture = (state: RootState) => state.lecture.lecture;
