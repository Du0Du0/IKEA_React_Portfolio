import { useEffect, useState, useRef } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { Helmet } from 'react-helmet-async';
import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useFlickrQuery } from '../../hooks/useFlickerQuery';

function Gallery() {
	const [Opt, setOpt] = useState({ type: 'user', user: '168950802@N02' });
	const { data: Items, isSuccess } = useFlickrQuery(Opt);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const path = process.env.PUBLIC_URL;
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const counter = useRef(0);
	const firstLoaded = useRef(true);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const loader = useRef(null);
	const openModal = useRef(null);
	const [ActiveMyGalleryBtn, setActiveMyGalleryBtn] = useState(true);
	const btnSet = useRef(null);
	const activeGalleryBtnStyle = {
		border: '1px solid rgb(224, 110, 3)',
		color: 'rgb(224, 110, 3)',
		transition: '0.5s',
	};

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	useEffect(() => {
		console.log(Items);
		counter.current = 0;
		if (isSuccess && Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '164021883@N04' });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		firstLoaded.current = false;
		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items]);

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	const showInterest = (e) => {
		setActiveMyGalleryBtn(true);
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		setOpt({ type: 'interest' });
	};

	const showMine = (e) => {
		setActiveMyGalleryBtn(true);
		if (!enableEvent.current) return;

		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		setOpt({ type: 'user', user: '168950802@N02' });
	};

	return (
		<>
			<Helmet>
				<title>gallery</title>
			</Helmet>
			<Layout type={'yellow'} name1={'gallery'} name2={`갤러리`} video={'productsFigure.mp4'}>
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
								if (!enableEvent.current) return;

								resetGallery(e);
								setOpt({ type: 'interest' });
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
								if (!enableEvent.current) return;

								resetGallery(e);
								setOpt({ type: 'user', user: '168950802@N02' });
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
						{isSuccess &&
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
														setOpt({ type: 'user', user: e.target.innerText });
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

			<Modal ref={openModal}>{isSuccess && <img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt={Items[Index]?.title} />}</Modal>
		</>
	);
}

export default Gallery;
