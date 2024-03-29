import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { petOwnerSlice } from "./petOwners";
import { petsSlice } from "./pets";

export const store = configureStore({
  reducer: {
    petOwners: petOwnerSlice.reducer,
    pets: petsSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
