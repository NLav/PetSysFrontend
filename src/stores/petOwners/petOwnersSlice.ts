import { createSlice } from "@reduxjs/toolkit";
import { IError, IPaginationMeta } from "interfaces";
import { IPetOwnerDTO, IPetOwnerGetAllParams } from "services/dtos";
import { petsSlice } from "stores/pets";
import { getPetOwnersListed, getPetOwnersPaginated } from "./thunks";

interface IPetOwnerState {
  petOwnersListed: IPetOwnerDTO[];
  petOwnersPaginated: IPetOwnerDTO[];
  meta: IPaginationMeta;
  loading: {
    petOwnersListed: boolean;
    petOwnersPaginated: boolean;
  };
  error: {
    petOwnersListed: IError | null;
    petOwnersPaginated: IError | null;
  };
  listingParams: IPetOwnerGetAllParams;
}

const initialState: IPetOwnerState = {
  petOwnersListed: [],
  petOwnersPaginated: [],
  listingParams: {
    orderBy: "name",
    orderDirection: "asc",
    quickSearch: "",
    name: "",
    address: "",
  },
  meta: { restPage: "1", restLimit: "8", restTotal: 1 },
  loading: {
    petOwnersListed: true,
    petOwnersPaginated: true,
  },
  error: {
    petOwnersListed: null,
    petOwnersPaginated: null,
  },
};

const petOwnerSlice = createSlice({
  name: "petOwners",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getPetOwnersListed.pending, (state) => {
      state.loading.petOwnersListed = true;
      state.error.petOwnersListed = null;
    });

    addCase(getPetOwnersListed.rejected, (state, { error }) => {
      state.loading.petOwnersListed = false;

      state.error.petOwnersListed = {
        statusCode: error.code || "",
        message: error.message || "Não recebido",
      };
    });

    addCase(getPetOwnersListed.fulfilled, (state, { payload }) => {
      state.loading.petOwnersListed = false;

      payload ? (state.petOwnersListed = payload) : null;
    });

    addCase(getPetOwnersPaginated.pending, (state, { meta }) => {
      state.loading.petOwnersPaginated = true;
      state.error.petOwnersPaginated = null;

      state.listingParams = meta.arg.listingParams;
    });

    addCase(getPetOwnersPaginated.rejected, (state, { error }) => {
      state.loading.petOwnersPaginated = false;

      state.error.petOwnersPaginated = {
        statusCode: error.code || "",
        message: error.message || "Não recebido",
      };

      state.petOwnersPaginated = [];
    });

    addCase(getPetOwnersPaginated.fulfilled, (state, { payload }) => {
      state.loading.petOwnersPaginated = false;

      payload ? (state.petOwnersPaginated = payload.items) : null;
      payload ? (state.meta = payload.meta) : null;
    });
  },
});

export const petOwnersActions = petsSlice.actions;
export { petOwnerSlice };
