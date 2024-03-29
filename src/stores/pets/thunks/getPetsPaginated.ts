import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPaginationMeta } from "interfaces";
import { PetService } from "services";
import { IPetGetAllParams } from "services/dtos";

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
    try {
      return (await PetService.getAll(listingParams, meta)).data;
    } catch (error) {
      return rejectWithValue({});
    }
  }
);
