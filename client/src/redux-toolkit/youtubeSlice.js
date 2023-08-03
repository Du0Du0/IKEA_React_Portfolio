//외부 데이터 fetching함수 정의 및 export
//외부데이터 함수의 결과값에 따라 전역상태 변경함수
import axios from 'axios';
//createAsyncThunk를 사용하면 비동기 작업에 대한 액션 타입이 자동으로 생성되고, pending, fulfilled, rejected와 같은 상태에 대한 액션 생성자 함수가 자동으로 생성
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받아서 내부적으로 액션타입을 자동생성해서 액션객체 생성까지 완료
export const fetchMainYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key2 = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
	const list2 = 'PLWgHnOZUp_4H3oyXBnWAhhQhWulLsuoPO';
	const num2 = 5;
	const url2 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list2}&key=${key2}&maxResults=${num2}`;
	const response = await axios.get(url2);
	return response.data.items;
});

// Redux Toolkit에서 제공하는 유틸리티 함수로서, 리덕스 상태와 액션을 간편하게 관리하기 위해 사용, 이 함수를 사용하면 리듀서와 액션 타입을 자동으로 생성
const youtubeSlice = createSlice({
	name: 'mainYoutube',
	initialState: {
		data: [],
		isLoading: false,
	},
	// Redux 액션에 대한 다양한 상태 변화를 처리하는데 사용
	extraReducers: {
		//비동기 작업이 실행 중일 때 호출되는 액션 상태
		[fetchMainYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		//비동기 작업이 성공적으로 완료되었을 때 호출되는 액션 상태
		[fetchMainYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		//비동기 작업이 실패했을 때 호출되는 액션 상태
		[fetchMainYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
