import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface IinitialState {
  sucursalList: ISucursal[]
  sucursalActivo: ISucursal | null;
}


const initialState: IinitialState = {
  sucursalList: [],
  sucursalActivo: null,
}

interface PayloadSetSucursalActivo {
  sucursalActivo: ISucursal; 
}
interface PayloadSetSucursalList {
  sucursalList: ISucursal[]; 
}


const SucursalReducer = createSlice({
  name: 'sucursalReducer',
  initialState,
  reducers: {
    setSucursalActivo(state, action: PayloadAction<PayloadSetSucursalActivo>) {
    state.sucursalActivo = action.payload.sucursalActivo; 
  },
  
  removeSucursalActivo(state) {
    state.sucursalActivo = null; 
  },
  setSucursalList(state, action: PayloadAction<PayloadSetSucursalList>){
    state.sucursalList = action.payload.sucursalList
  }
  },
})

export const { setSucursalActivo, removeSucursalActivo, setSucursalList } = SucursalReducer.actions


export default SucursalReducer.reducer