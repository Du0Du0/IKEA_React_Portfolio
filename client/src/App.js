import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { setSubYoutube } from './redux/action';
import { setMainYoutube } from './redux/action';
import { useEffect } from 'react';
import axios from 'axios';
import { setLoginUser, setLogoutUser } from './redux/action';
import firebase from './firebase';
import { useCallback, useRef } from 'react';

//common
import Footer from './components/common/Footer';
import FooterNone from './components/common/FooterNone';
import Header from './components/common/Header';
import TopButton from './components/common/TopButton';
import Scroll_navi from './components/common/Scroll_navi';
import GlobalStyle from './GlobalStyle';
import Menu from './components/common/Menu';

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
import ProductsDetail from './components/sub/ProductsDetail';
import FaqRead from './components/sub/FaqRead';
import FaqWrite from './components/sub/FaqWrite';
import FaqDetail from './components/sub/FaqDetail';

function App() {
	const dispatch = useDispatch();
	const youtubeIndicatorLists = ['Title', 'About', 'Photo', 'Video', 'List'];
	const menuRef = useRef(null);

	//서브페이지 유투브 데이터
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

	//메인페이지 유투브 데이터
	const fetchMainYoutube = useCallback(async () => {
		const key2 = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
		const list2 = 'PLWgHnOZUp_4H3oyXBnWAhhQhWulLsuoPO';
		const num2 = 5;
		const url2 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list2}&key=${key2}&maxResults=${num2}`;

		const result2 = await axios.get(url2);
		dispatch(setMainYoutube(result2.data.items));
		console.log('result2.data.items', result2.data.items);
	}, [dispatch]);

	useEffect(() => {
		fetchMainYoutube();
	}, [fetchMainYoutube]);

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

				<Route path='/' render={() => <Header type={'sub'} menu={menuRef} />}></Route>
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
					path='/faq'
					render={() => (
						<>
							<FaqRead />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/faq/write'
					render={() => (
						<>
							<FaqWrite />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/faq/detail'
					render={() => (
						<>
							<FaqDetail />
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
