import { createSlice } from '@reduxjs/toolkit';

//서버사이드 state를 관리하지 않기 때문에 createAsyncThunk함수는 불필요
export const menuSlice = createSlice({
	name: 'menu',
	initialState: { open: false },
	//서버사이드 state를 관리하는 것이 아닌 client side state관리이므로 reudcer로 설정
	reducers: {
		close: (state) => {
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

//state변경함수 export
export const { close, toggle } = menuSlice.actions;
export default menuSlice.reducer;
