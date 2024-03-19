import { createSlice } from "@reduxjs/toolkit";
import { IError, IPaginationMeta } from "interfaces";
import { IPetDTO, IPetGetAllParams } from "services/dtos";
import { getPetsPaginated } from "./thunks";

interface IPetState {
  petsPaginated: IPetDTO[];
  meta: IPaginationMeta;
  loading: {
    petsPaginated: boolean;
  };
  error: {
    petsPaginated: IError | null;
  };
  listingParams: IPetGetAllParams;
}

const initialState: IPetState = {
  petsPaginated: [],
  listingParams: {
    orderBy: "name",
    orderDirection: "asc",
    quickSearch: "",
    name: "",
    birth_date: "",
    breed: "",
  },
  meta: { restPage: "1", restLimit: "8", restTotal: 1 },
  loading: {
    petsPaginated: true,
  },
  error: {
    petsPaginated: null,
  },
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getPetsPaginated.pending, (state, { meta }) => {
      state.loading.petsPaginated = true;
      state.error.petsPaginated = null;

      state.listingParams = {
        ...meta.arg.listingParams,
        birth_date:
          String(meta.arg.listingParams.birth_date) !== ""
            ? String(meta.arg.listingParams.birth_date)
            : "",
      };
    });

    addCase(getPetsPaginated.rejected, (state, { error }) => {
      state.loading.petsPaginated = false;

      state.error.petsPaginated = {
        statusCode: error.code || "",
        message: error.message || "Não recebido",
      };

      state.petsPaginated = [];
    });

    addCase(getPetsPaginated.fulfilled, (state, { payload }) => {
      state.loading.petsPaginated = false;
      payload ? (state.petsPaginated = payload.items) : null;
      payload ? (state.meta = payload.meta) : null;
    });
  },
});

export const petsActions = petsSlice.actions;
export { petsSlice };
