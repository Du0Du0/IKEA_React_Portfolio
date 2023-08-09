import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const YOUTUBE_API_KEY = process.env.REACT_APP_CLIENT_YOUTUBE_API_KEY;
const SUB_YOUTUBE_LIST = process.env.REACT_APP_CLIENT_SUB_YOUTUBE_LIST;

//sub youtube with redux
const fetchSubYoutube = async () => {
	const key = YOUTUBE_API_KEY;
	const list = SUB_YOUTUBE_LIST;
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
};

export const useSubYoutubeQuery = () => {
	return useQuery(['subYoutubeData'], fetchSubYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5,
	});
};
