import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { Helmet } from 'react-helmet-async';
import { setSubYoutube } from './redux/action';
import { setMainYoutube } from './redux/action';
import axios from 'axios';
import { setLoginUser, setLogoutUser } from './redux/action';
import firebase from './firebase';
import { useCallback, useRef } from 'react';

import { fetchMainYoutube } from './redux-toolkit/mainYoutubeSlice';
import { fetchFlickr } from './redux-toolkit/flickerSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//common
import Footer from './components/common/Footer';
import FooterNone from './components/common/FooterNone';
import Header from './components/common/Header';
import TopButton from './components/common/TopButton';
import Scroll_navi from './components/common/Scroll_navi';
import GlobalStyle from './GlobalStyle';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';
import Write from './components/sub/Write';
import Detail from './components/sub/Detail';
import Update from './components/sub/Update';
import MuseumDetail from './components/sub/MuseumDetail';
import PromotionDetail from './components/sub/PromotionDetail';
import Login from './components/sub/Login';
import FindPassword from './components/sub/FindPassword';
import Mongo from './components/sub/Mongo';
import ProductsDetail from './components/sub/ProductsDetail';
import Menu from './components/common/Menu';

function App() {
	const dispatch = useDispatch();
	const youtubeIndicatorLists = ['Title', 'About', 'Photo', 'Video', 'List'];
	const menuRef = useRef(null);

	//sub youtube with redux
	const fetchSubYoutube = useCallback(async () => {
		const key1 = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
		const list1 = 'PLWgHnOZUp_4FJWdMzYeEAM4Waf8IhnZCB';
		const num1 = 8;
		const url1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list1}&key=${key1}&maxResults=${num1}`;

		const result1 = await axios.get(url1);
		dispatch(setSubYoutube(result1.data.items));
		console.log('result1.data.items', result1.data.items);
	}, [dispatch]);

	useEffect(() => {
		fetchSubYoutube();
	}, [fetchSubYoutube]);

	//redux-toolkit
	useEffect(() => {
		dispatch(fetchMainYoutube());
		dispatch(fetchFlickr({ type: 'user', user: '168950802@N02' }));
	}, [dispatch]);

	/*
	redux-toolkit의 작업흐름
	1.redux 폴더안쪽에 작업하려는 data의 slice 파일 생성 (data fetching후 액션객체 생성함수, 액션객체받아서 전역데이터 수정함수)
	2.index.js에서 slice값으로 연동된 데이터 store에 저장하고 App에 전달
	3.app.js에서 slice파일로부터 action객체 생성함수를 import후 호출하여 action만들고 dispatch로 전달
	4.원하는 컴포넌트에서 useSelector로 데이터 가져오기
*/

	//firebase login & logout
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log('userInfo', userInfo);
			if (userInfo === null) dispatch(setLogoutUser());
			else dispatch(setLoginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	useEffect(() => {
		//firebase.auth().signOut();
	}, []);

	return (
		<>
			<Helmet>
				<title>이케아 코리아(대표)</title>
			</Helmet>
			<GlobalStyle />

			{/* Switch는 내부에 중복되는 라우트 경로가 있을때 더 먼저 나오는 라우터를 채택하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/ikea-react' component={Main}></Route>

				<Route path='/' render={() => <Header type={'sub'} />}></Route>
			</Switch>

			<Switch>
				<Route
					path='/gallery'
					render={() => (
						<>
							<Gallery />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/products/detail'
					render={() => (
						<>
							<ProductsDetail />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/contact'
					render={() => (
						<>
							<Contact />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/department'
					render={() => (
						<>
							<Department />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/member'
					render={() => (
						<>
							<Member />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/community/articles'
					render={() => (
						<>
							<Community />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/mongos'
					render={() => (
						<>
							<Mongo />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/write'
					render={() => (
						<>
							<Write />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/community/articles/:idx'
					render={() => (
						<>
							<Detail />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/update'
					render={() => (
						<>
							<Update />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/museum/articles/:idx'
					render={() => (
						<>
							<MuseumDetail />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/promotion/articles/:idx'
					render={() => (
						<>
							<PromotionDetail />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/login'
					render={() => (
						<>
							<Login />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/passwordSearch'
					render={() => (
						<>
							<FindPassword />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/youtube'
					render={() => (
						<>
							<Youtube />
							<Scroll_navi type={''} pageLists={youtubeIndicatorLists} />
							<Footer type={'bl'} imgBg={'footerBl'} />
						</>
					)}
				></Route>
			</Switch>
			<Menu ref={menuRef} />
		</>
	);
}

export default App;
