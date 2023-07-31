import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { Helmet } from 'react-helmet-async';
import Modal from '../common/Modal';

function ProductsDetail() {
	const path = process.env.PUBLIC_URL;
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const loader = useRef(null);
	const openModal = useRef(null);

	const getFlickr = async (opt) => {
		let counter = 0;
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '08e2b5a2a14d18ff9a849c7109134194';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 100;

		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

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

	const location = useLocation();
	const Topic = location.state && location.state.Topic;
	const Search = location.state && location.state.Search;
	const Title = location.state && location.state.Title;
	const Desc = location.state && location.state.Desc;
	const MainPic = location.state && location.state.MainPic;
	const SubPic = location.state && location.state.SubPic;
	const SubDesc = location.state && location.state.SubDesc;

	useEffect(() => getFlickr({ type: 'search', tags: `${Search}` }), []);

	const topBannerLeftStyle = {
		backgroundImage: `url(${path + `/img/${MainPic}`})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center ',
		backgroundSize: 'cover',
		objectFit: 'cover',
	};

	const topBannerRightStyle = {
		backgroundImage: `url(${path + `/img/${SubPic}`})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center ',
		backgroundSize: 'cover',
		objectFit: 'cover',
	};

	return (
		<>
			<Helmet>
				<title>{'Category' + ' / ' + `${Topic.toUpperCase()}`}</title>
			</Helmet>
			<Layout type={'yellow'} name1={'productsDetail'} name2={`${Title}`} video={'productsFigure.mp4'}>
				<div className='topBanner'>
					<div className='topBannerLeft' style={topBannerLeftStyle}>
						<h2>
							<span>{Desc.toUpperCase()}</span>
							<br />
							{Topic.toUpperCase()}
						</h2>
					</div>
					<div className='topBannerRight'>
						<div className='topBannerRightWrap'>
							<div className='topDescWrap'>
								{/* 전체 카테고리 표시 */}
								<div className='categoryWrap'>
									<p>Products</p>/<p>Category</p>
								</div>
								{/* 현재 카테고리 표시 */}
								<p> {Topic}</p>
							</div>
							{/* 현재 포스트 제목 */}
							<h2>{SubDesc.toUpperCase()}</h2>
							{/* 현재 포스트 사진 */}
							<div className='imgBox1' style={topBannerRightStyle}></div>
						</div>
					</div>
				</div>
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div className='topDescWrap'>
											<div className='categoryWrap'>
												{/*  전체 카테고리 */}
												<p>Products</p>/<p>Category</p>
											</div>
											{/* 현재 카테고리 */}
											<p> {Topic}</p>
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
													setLoader(true);
													frame.current.classList.remove('on');
													getFlickr({ type: 'user', user: e.target.innerText });
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

export default ProductsDetail;
