import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { UserService } from "services";
import { IUserDTO, IUserGetAllParams } from "services/dtos";

const responseCache: Record<
  string,
  IPaginatedList<Omit<IUserDTO, "password">>
> = {};

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
    const cacheKey = JSON.stringify({ listingParams, meta });

    if (responseCache[cacheKey]) {
      return responseCache[cacheKey];
    }

    try {
      const responseData = (await UserService.getAll(listingParams, meta)).data;

      responseCache[cacheKey] = responseData;

      return responseData;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
