import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollTop';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainYoutubeReducer from './redux-toolkit/mainYoutubeSlice';
import flickrReducer from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		mainYoutube: mainYoutubeReducer,
		flickr: flickrReducer,
	},
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<HelmetProvider>
				<ScrollToTop />
				<App />
			</HelmetProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
