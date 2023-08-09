import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const YOUTUBE_API_KEY = process.env.REACT_APP_CLIENT_YOUTUBE_API_KEY;
const MAIN_YOUTUBE_LIST = process.env.REACT_APP_CLIENT_MAIN_YOUTUBE_LIST;

///메인페이지 유투브 데이터
const fetchMainYoutube = async () => {
	const key = YOUTUBE_API_KEY;
	const list = MAIN_YOUTUBE_LIST;
	const num = 5;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
};

export const useMainYoutubeQuery = () => {
	return useQuery(['MainYoutubeData'], fetchMainYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5,
	});
};
