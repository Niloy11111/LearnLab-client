import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  photo?: string;
  role: "ADMIN" | "Landlord" | "Tenant";
};

type TUserState = {
  users: TUser[];
};

const initialState: TUserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

// export const selectAllUsers = (state: RootState) => state.users.users;
