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
import Contact from './components/sub/contactPage/Contact';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';
import MuseumDetail from './components/sub/MuseumDetail';
import PromotionDetail from './components/sub/PromotionDetail';
import ProductsDetail from './components/sub/ProductsDetail';
import Community from './components/sub/communityPage/Community';
import Update from './components/sub/communityPage/Update';
import Write from './components/sub/communityPage/Write';
import Detail from './components/sub/communityPage/Detail';
import Department from './components/sub/joinPage/Department';
import FindPassword from './components/sub/joinPage/FindPassword';
import Login from './components/sub/joinPage/Login';
import FaqRead from './components/sub/faqPage/FaqRead';
import FaqWrite from './components/sub/faqPage/FaqWrite';
import FaqDetail from './components/sub/faqPage/FaqDetail';
import FaqUpdate from './components/sub/faqPage/FaqUpdate';

function App() {
	const dispatch = useDispatch();
	const youtubeIndicatorLists = ['Title', 'About', 'Photo', 'Video', 'List'];
	const menuRef = useRef(null);
	const YOUTUBE_API_KEY = process.env.REACT_APP_CLIENT_YOUTUBE_API_KEY;
	const MAIN_YOUTUBE_LIST = process.env.REACT_APP_CLIENT_MAIN_YOUTUBE_LIST;
	const SUB_YOUTUBE_LIST = process.env.REACT_APP_CLIENT_SUB_YOUTUBE_LIST;

	//메인페이지 유투브 데이터
	const fetchMainYoutube = useCallback(async () => {
		const key = YOUTUBE_API_KEY;
		const listMain = MAIN_YOUTUBE_LIST;
		const numMain = 5;
		const urlMain = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${listMain}&key=${key}&maxResults=${numMain}`;

		const resultMain = await axios.get(urlMain);
		dispatch(setMainYoutube(resultMain.data.items));
	}, [dispatch]);

	useEffect(() => {
		fetchMainYoutube();
	}, [fetchMainYoutube]);

	//서브페이지 유투브 데이터
	const fetchSubYoutube = useCallback(async () => {
		const key = YOUTUBE_API_KEY;
		const listSub = SUB_YOUTUBE_LIST;
		const numSub = 8;
		const urlSub = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${listSub}&key=${key}&maxResults=${numSub}`;

		const resultSub = await axios.get(urlSub);
		dispatch(setSubYoutube(resultSub.data.items));
	}, [dispatch]);

	useEffect(() => {
		fetchSubYoutube();
	}, [fetchSubYoutube]);

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
					path='/faq/detail/:id'
					render={() => (
						<>
							<FaqDetail />
							<FooterNone type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					exact
					path='/faq/update/:id'
					render={() => (
						<>
							<FaqUpdate />
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
