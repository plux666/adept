import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import companiesSlice from "./companiesSlice";
import { saveObjToLocalStore } from "../_shared/utils";

export const store = configureStore({
  reducer: {
    companiesList: companiesSlice.reducer,
  },
});

store.subscribe(() => {
  saveObjToLocalStore(store.getState().companiesList.list);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
