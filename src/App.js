import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
//common
import Footer from './components/common/Footer';
import FooterNone from './components/common/FooterNone';
import Header from './components/common/Header';

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

function App() {
	return (
		<>
			{/* Switch는 내부에 중복되는 라우트 경로가 있을때 더 먼저 나오는 라우터를 채택하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' component={Main}></Route>

				<Route path='/' render={() => <Header type={'sub'} />}></Route>
			</Switch>

			<Switch>
				<Route
					path='/gallery'
					render={() => (
						<>
							<Gallery />
							<Footer type={'sub'} imgBg={'footerW'} />
						</>
					)}
				></Route>

				<Route
					path='/contact'
					render={() => (
						<>
							<Contact />
							<Footer type={'sub'} imgBg={'footerW'} />
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
					path='/community'
					render={() => (
						<>
							<Community />
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
					path='/detail'
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
					path='/youtube'
					render={() => (
						<>
							<Youtube />
							<Footer type={'bl'} imgBg={'footerBl'} />
						</>
					)}
				></Route>
			</Switch>
		</>
	);
}

export default App;
