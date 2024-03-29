import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginationMeta } from "interfaces";
import { PetOwnerService } from "services";
import { IPetOwnerGetAllParams } from "./../../../services/dtos";

export const getPetOwnersPaginated = createAsyncThunk(
  "petOwners/listPaginated",
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
    try {
      return (await PetOwnerService.getAll(listingParams, meta)).data;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
