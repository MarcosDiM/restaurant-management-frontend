import { configureStore } from "@reduxjs/toolkit";
import empresasReducer from "../slices/empresasSlice";
import SucursalReducer from "../slices/SucursalReducer";
import ImageReducer from "../slices/ImageReducer";

export const store = configureStore({
	reducer: {
		empresas: empresasReducer,
		sucursal: SucursalReducer,
		image: ImageReducer,
	},
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
