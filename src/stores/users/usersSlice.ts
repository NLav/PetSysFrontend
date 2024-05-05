import { createSlice } from "@reduxjs/toolkit";
import { IError, IPaginationMeta } from "interfaces";
import { IUserDTO, IUserGetAllParams } from "services/dtos";
import { getUsersPaginated } from "./thunks";

interface IUserState {
  usersPaginated: IUserDTO[];
  listingParams: IUserGetAllParams;
  meta: IPaginationMeta;
  loading: {
    usersPaginated: boolean;
  };
  error: {
    usersPaginated: IError | null;
  };
}

const initialState: IUserState = {
  usersPaginated: [],
  listingParams: {
    orderBy: "name",
    orderDirection: "asc",
    quickSearch: "",
    name: "",
    email: "",
  },
  meta: { restPage: "1", restLimit: "8", restTotal: 1 },
  loading: {
    usersPaginated: true,
  },
  error: {
    usersPaginated: null,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getUsersPaginated.pending, (state, { meta }) => {
      state.loading.usersPaginated = true;
      state.error.usersPaginated = null;

      state.listingParams = meta.arg.listingParams;
    });

    addCase(getUsersPaginated.rejected, (state, { error }) => {
      state.loading.usersPaginated = false;

      state.error.usersPaginated = {
        statusCode: error.code || "",
        message: error.message || "Não recebido",
      };

      state.usersPaginated = [];
    });

    addCase(getUsersPaginated.fulfilled, (state, { payload }) => {
      state.loading.usersPaginated = false;
      payload ? (state.usersPaginated = payload.items) : null;
      payload ? (state.meta = payload.meta) : null;
    });
  },
});

export const usersActions = usersSlice.actions;
export { usersSlice };
