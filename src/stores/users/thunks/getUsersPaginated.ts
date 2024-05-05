import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginationMeta } from "interfaces";
import { UserService } from "services";
import { IUserGetAllParams } from "services/dtos";

export const getUsersPaginated = createAsyncThunk(
  "users/getPaginated",
  async (
    {
      listingParams,
      meta,
    }: {
      listingParams: IUserGetAllParams;
      meta: IPaginationMeta;
    },
    { rejectWithValue }
  ) => {
    try {
      return (await UserService.getAll(listingParams, meta)).data;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
