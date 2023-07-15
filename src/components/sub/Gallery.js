import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '08e2b5a2a14d18ff9a849c7109134194';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 500;
		//const myId = '168950802@N02';
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);
	};

	//아래 호출문으로 풍경이미지 검색되도록 함수 코드 수정
	//getFlickr({type: 'search', tags: 'landscape'})

	//아래 호출문으로 내 계정의 이미지 갤러리 호출되도록
	//getFlickr({type: 'user', user: '내아이디'})
	// useEffect(() => getFlickr({ type: 'user', user: '168950802@N02' }), []);
	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<Layout name1={'gallery'} name2={'갤러리'} video={'pexels.mp4'}>
			<div className='frame'>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
									</div>
									<h2>{item.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span>{item.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}

export default Gallery;
