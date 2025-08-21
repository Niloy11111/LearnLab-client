import { IUserProgress } from "@/types/userProgress";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FiltersState {
  courseTitle: string;
  moduleTitle: string;
}

interface InitialStateTypes {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
  userProgress: IUserProgress;
}

export const initialState: InitialStateTypes = {
  filters: {
    courseTitle: "",
    moduleTitle: "any",
  },
  isFiltersFullOpen: false,
  viewMode: "list",
  userProgress: {
    userId: "",
    completedLectures: [],
    unlockedLectures: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as IUserProgress,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    setHasUserProgress: (state, action: PayloadAction<IUserProgress>) => {
      state.userProgress = action.payload;
    },
  },
});

export const {
  setFilters,
  toggleFiltersFullOpen,
  setViewMode,
  setHasUserProgress,
} = globalSlice.actions;

export const selectCurrenUserProgress = (state: RootState) =>
  state.global.userProgress;

export default globalSlice.reducer;
