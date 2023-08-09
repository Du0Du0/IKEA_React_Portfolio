import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//sub youtube with redux
const fetchSubYoutube = async () => {
	const key1 = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
	const list1 = 'PLWgHnOZUp_4FJWdMzYeEAM4Waf8IhnZCB';
	const num1 = 8;
	const url1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list1}&key=${key1}&maxResults=${num1}`;

	const response = await axios.get(url1);
	return response.data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['subYoutubeData'], fetchSubYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5,
	});
};
