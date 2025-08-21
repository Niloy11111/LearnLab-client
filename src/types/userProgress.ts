export interface IUserProgress {
  _id: string;
  userId: string;
  completedLectures: string[];
  unlockedLectures: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserProgressUpdate {
  userId: string;
  currentLecture: string;
  nextLecture: string;
  createdAt?: Date;
  updatedAt?: Date;
}
