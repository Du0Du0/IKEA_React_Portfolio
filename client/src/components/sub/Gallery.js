import { useEffect, useState, useRef } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { Helmet } from 'react-helmet-async';
import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const path = process.env.PUBLIC_URL;
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const loader = useRef(null);
	const openModal = useRef(null);
	const [Mounted, setMounted] = useState(true);
	const [ActiveMyGalleryBtn, setActiveMyGalleryBtn] = useState(true);
	const btnSet = useRef(null);
	const activeGalleryBtnStyle = {
		border: '1px solid rgb(224, 110, 3)',
		color: 'rgb(224, 110, 3)',
		transition: '0.5s',
	};
	const FLIKER_API_KEY = process.env.REACT_APP_CLIENT_FLIKER_API_KEY;
	const FLIKER_MY_ID = process.env.REACT_APP_CLIENT_FLIKER_MY_ID;

	const getFlickr = async (opt) => {
		//getFlickr함수가 재실행될떄마다 어차피 counter값을 초기화되어야 하므로 useRef가 아닌 일반 지역변수로 설정
		let counter = 0;
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = FLIKER_API_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		if (result.data.photos.photo.length === 0 || result.data.photos.photo === undefined) {
			setLoader(false);

			frame.current.classList.add('on');
			setActiveMyGalleryBtn(true);
			getFlickr({ type: 'user', user: FLIKER_MY_ID });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

		//외부데이터가 State에 담기고 DOM이 생성되는 순간
		//모든 img요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');
		//만약 imgs에 받아지는 값이 없으면 밑에 반복문이 실행안되도록 return으로 강제 종료
		if (!imgs) return;

		imgs.forEach((img) => {
			//이미지요소에 load이벤트가 발생할때 (소스이미지까지 로딩이 완료될떄마다)
			img.onload = () => {
				//내부적으로 카운터값을 1씩 증가
				++counter;

				//로딩완료된 이미지수와 전체이미지수가 같아지면
				if (counter === imgs.length - 2) {
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

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	useEffect(() => getFlickr({ type: 'user', user: FLIKER_MY_ID }), []);

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		getFlickr({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	const showInterest = (e) => {
		setActiveMyGalleryBtn(true);
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		setActiveMyGalleryBtn(true);
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'user', user: FLIKER_MY_ID });
	};

	return (
		<>
			<Helmet>
				<title>gallery</title>
			</Helmet>
			<Layout type={'yellow'} name1={'gallery'} name2={`갤러리`} video={'galleryFigure.mp4'}>
				<div className='searchBarWrap'>
					<div className='searchBox'>
						<input type='text' id='search' placeholder='찾으시는 검색어를 입력해 주세요' autoFocus={true} ref={searchInput} onKeyPress={(e) => e.key === 'Enter' && showSearch(e)} />
						<button className='btnSearch' onClick={showSearch}>
							<p>검색</p>
						</button>
					</div>

					<div class='btnSet' ref={btnSet}>
						<button
							className='btnInterest'
							onClick={(e) => {
								setActiveMyGalleryBtn(false);
								//재이벤트, 모션중 재이벤트 방지
								if (!enableEvent.current) return;

								//기존 갤러리 초기화 함수 호출
								resetGallery(e);
								getFlickr({ type: 'interest' });
								isUser.current = false;
							}}
							style={ActiveMyGalleryBtn === false ? activeGalleryBtnStyle : null}
						>
							<span style={{ display: ActiveMyGalleryBtn === false ? 'none' : 'block' }}>
								<FontAwesomeIcon icon={faPlus} /> Interest Gallery
							</span>
							<span style={{ display: ActiveMyGalleryBtn === false ? 'block' : 'none' }}>
								<FontAwesomeIcon icon={faCheck} /> Interest Gallery
							</span>
						</button>
						<button
							className='btnMine'
							onClick={(e) => {
								setActiveMyGalleryBtn(true);
								//재이벤트, 모션중 재이벤트 방지
								if (!enableEvent.current) return;

								//기존 갤러리 초기화 함수 호출
								resetGallery(e);
								getFlickr({ type: 'user', user: FLIKER_MY_ID });
								isUser.current = false;
							}}
							style={ActiveMyGalleryBtn === true ? activeGalleryBtnStyle : null}
						>
							<span style={{ display: ActiveMyGalleryBtn === true ? 'none' : 'block' }}>
								<FontAwesomeIcon icon={faPlus} /> &nbsp; My Gallery
							</span>
							<span style={{ display: ActiveMyGalleryBtn === true ? 'block' : 'none' }}>
								<FontAwesomeIcon icon={faCheck} /> &nbsp; My Gallery
							</span>
						</button>
					</div>
				</div>
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Mounted &&
							Items.map((item, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div className='topDescWrap'>
												<div className='categoryWrap'>
													{/*  전체 카테고리 */}
													<p>Gallery</p>/<p>{ActiveMyGalleryBtn === true ? 'My Gallery' : 'Interest Gallery'}</p>
												</div>
												{/* 현재 카테고리 */}
												<p> {ActiveMyGalleryBtn === true ? 'interior' : 'landscape'}</p>
											</div>
											{/*  제목 */}
											<h2>{item.title ? item.title.toUpperCase() : null}</h2>

											<div className='profile'>
												{/* 프로필 사진*/}
												<img
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.owner}
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												{/* 프로필 사진 클릭 시  해당 유저 페이지로 이동 */}
												<span
													onClick={(e) => {
														if (isUser.current) return;
														isUser.current = true;
														setLoader(true);
														frame.current.classList.remove('on');
														getFlickr({ type: 'user', user: e.target.innerText });
														setActiveMyGalleryBtn(null);
													}}
												>
													{/* 프로필 유저명 */}
													{item.owner}
												</span>
											</div>

											<div
												className='pic'
												onClick={() => {
													openModal.current.open();
													setIndex(idx);
												}}
											>
												<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
											</div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</div>
				{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loadingBar350.gif`} alt='loader' ref={loader} />}
			</Layout>

			<Modal ref={openModal}>
				<img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt={Items[Index]?.title} />
			</Modal>
		</>
	);
}

export default Gallery;
