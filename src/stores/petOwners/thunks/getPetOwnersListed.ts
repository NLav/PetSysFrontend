import { createAsyncThunk } from "@reduxjs/toolkit";
import { PetOwnerService } from "services";

export const getPetOwnersListed = createAsyncThunk(
  "petOwners/getList",
  async (_, { rejectWithValue }) => {
    try {
      return (await PetOwnerService.getAllListed()).data;
    } catch (error) {
      rejectWithValue({});
    }
  }
);
