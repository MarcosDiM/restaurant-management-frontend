import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  imageStringActivo: string | null,
}
const initialState: IinitialState = {
  imageStringActivo: null,
}
const ImageReducer  = createSlice({
  name:"imageReducer",
  initialState,
  reducers:{
    setImageStringActivo(state, action: PayloadAction<string>){
      state.imageStringActivo = action.payload
    },
    removeImageActivo(state){
      state.imageStringActivo = null;
    }
  }
  

})

export const {setImageStringActivo, removeImageActivo} = ImageReducer.actions

export default ImageReducer.reducer