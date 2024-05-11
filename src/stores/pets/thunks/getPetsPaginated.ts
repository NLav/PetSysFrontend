import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { PetService } from "services";
import { IPetDTO, IPetGetAllParams } from "services/dtos";

const responseCache: Record<string, IPaginatedList<IPetDTO>> = {};

export const getPetsPaginated = createAsyncThunk(
  "pets/getPaginated",
  async (
    {
      listingParams,
      meta,
    }: {
      listingParams: IPetGetAllParams;
      meta: IPaginationMeta;
    },
    { rejectWithValue }
  ) => {
    const cacheKey = JSON.stringify({ listingParams, meta });

    if (responseCache[cacheKey]) {
      return responseCache[cacheKey];
    }

    try {
      const responseData = (await PetService.getAll(listingParams, meta)).data;

      responseCache[cacheKey] = responseData;

      return responseData;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
