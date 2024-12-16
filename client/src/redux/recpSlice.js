import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    recps: {},
};

const recpSlice = createSlice({
    name: "recp",
    initialState,
    reducers: {
        getRecps(state, action) {
            state.recps = action.payload;
        }
    }
})

export default recpSlice.reducer;

export function SetRecps(recp) {
return (dispatch, getState) =>{
    dispatch(recpSlice.actions.getRecps(recp));
}
}