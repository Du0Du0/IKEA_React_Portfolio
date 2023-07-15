import { useEffect, useState, useRef } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Gallery() {
	const enableEvent = useRef(true);
	const [Items, setItems] = useState([]);
	const frame = useRef(null);
	const [Loader, setLoader] = useState(true);

	const getFlickr = async (opt) => {
		//getFlickr함수가 재실행될떄마다 어차피 counter값을 초기화되어야 하므로 useRef가 아닌 일반 지역변수로 설정
		let counter = 0;
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
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

		//외부데이터가 State에 담기고 DOM이 생성되는 순간
		//모든 img요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			//이미지요소에 load이벤트가 발생할때 (소스이미지까지 로딩이 완료될떄마다)
			img.onload = () => {
				//내부적으로 카운터값을 1씩 증가
				++counter;

				//로딩완료된 이미지수와 전체이미지수가 같아지면
				if (counter === imgs.length - 1) {
					//로더 제거하고 이미지 갤러리 보임처리
					setLoader(false);
					frame.current.classList.add('on');

					setTimeout(() => {
						enableEvent.current = true;
					}, 1000);
				}
			};
		});
	};

	//아래 호출문으로 풍경이미지 검색되도록 함수 코드 수정
	//getFlickr({type: 'search', tags: 'landscape'})

	useEffect(() => getFlickr({ type: 'user', user: '168950802@N02' }), []);

	return (
		<Layout name1={'gallery'} name2={'갤러리'} video={'pexels.mp4'}>
			<button
				onClick={() => {
					if (!enableEvent.current) return;
					enableEvent.current = false;
					setLoader(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'interest' });
				}}
			>
				Interest Gallery
			</button>
			<button
				onClick={() => {
					if (!enableEvent.current) return;
					enableEvent.current = false;
					setLoader(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'user', user: '164021883@N04' });
				}}
			>
				My Gallery
			</button>
			<div className='frame' ref={frame}>
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
										<span
											onClick={(e) => {
												setLoader(true);
												frame.current.classList.remove('on');
												getFlickr({ type: 'user', user: e.target.innerText });
											}}
										>
											{item.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
		</Layout>
	);
}

export default Gallery;
