import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchSubYoutube = async () => {
	const key1 = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
	const list1 = 'PLWgHnOZUp_4FJWdMzYeEAM4Waf8IhnZCB';
	const num1 = 8;
	const url1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list1}&key=${key1}&maxResults=${num1}`;

	const response = await axios.get(url1);
	return response.data.items;
};

// Redux Toolkit에서 제공하는 유틸리티 함수로서, 리덕스 상태와 액션을 간편하게 관리하기 위해 사용, 이 함수를 사용하면 리듀서와 액션 타입을 자동으로 생성
const subYoutubeSlice = createSlice({
	name: 'mainYoutube',
	initialState: {
		data: [],
		isLoading: false,
	},
	// Redux 액션에 대한 다양한 상태 변화를 처리하는데 사용
	extraReducers: {
		//비동기 작업이 실행 중일 때 호출되는 액션 상태
		[fetchSubYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		//비동기 작업이 성공적으로 완료되었을 때 호출되는 액션 상태
		[fetchSubYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		//비동기 작업이 실패했을 때 호출되는 액션 상태
		[fetchSubYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default subYoutubeSlice.reducer;
