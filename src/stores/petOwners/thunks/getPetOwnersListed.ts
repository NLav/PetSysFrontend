import { createAsyncThunk } from "@reduxjs/toolkit";
import { PetOwnerService } from "services";
import { IPetOwnerDTO } from "services/dtos";

let responseCache: IPetOwnerDTO[];

export const getPetOwnersListed = createAsyncThunk(
  "petOwners/getList",
  async (_, { rejectWithValue }) => {
    if (responseCache) {
      return responseCache;
    }

    try {
      const responseData = (await PetOwnerService.getAllListed()).data;

      responseCache = responseData;

      return responseData;
    } catch (error) {
      rejectWithValue({});
    }
  }
);
