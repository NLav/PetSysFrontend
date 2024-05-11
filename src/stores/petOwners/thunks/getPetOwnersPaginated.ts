import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { PetOwnerService } from "services";
import { IPetOwnerDTO, IPetOwnerGetAllParams } from "./../../../services/dtos";

const responseCache: Record<string, IPaginatedList<IPetOwnerDTO>> = {};

export const getPetOwnersPaginated = createAsyncThunk(
  "petOwners/getPaginated",
  async (
    {
      listingParams,
      meta,
    }: {
      listingParams: IPetOwnerGetAllParams;
      meta: IPaginationMeta;
    },
    { rejectWithValue }
  ) => {
    const cacheKey = JSON.stringify({ listingParams, meta });

    if (responseCache[cacheKey]) {
      return responseCache[cacheKey];
    }

    try {
      const responseData = (
        await PetOwnerService.getAllPaginated(listingParams, meta)
      ).data;

      responseCache[cacheKey] = responseData;

      return responseData;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
