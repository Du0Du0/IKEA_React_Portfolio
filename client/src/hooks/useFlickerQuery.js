import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFlickr = async ({ queryKey }) => {
	const opt = queryKey[1];
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '08e2b5a2a14d18ff9a849c7109134194';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 50;
	//const myId = '168950802@N02';
	let url = '';
	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	const result = await axios.get(url);
	return result.data.photos.photo;
};

export const useFlickrQuery = (opt) => {
	return useQuery(['flickerData', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,

		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};
