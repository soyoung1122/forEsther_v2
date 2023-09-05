import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts: []
}


const toastSlice = createSlice({
    //슬라이스에 들어가야 하는 3가지

    //자신만의 이름
    name: 'toast',
    //데이터
    initialState,
    //함수 (슬라이스에서 핸들링 하고자하는 함수들)
    reducers: {
        addToast:(state, action) => {
            //action.payload는 addToast에서 보내는 파라미터
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => {
                return toast.id !== action.payload
            });
        }
    }
});

//console.log(toastSlice.actions.addToast('hello'));

export const { removeToast } = toastSlice.actions;
export const { addToast } = toastSlice.actions;
export default toastSlice.reducer;