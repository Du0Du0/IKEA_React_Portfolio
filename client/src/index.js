import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainYoutube from './redux/youtubeSlice';
import ScrollToTop from './components/common/ScrollTop';
import { HelmetProvider } from 'react-helmet-async';

const store = configureStore({
	reducer: {
		youtube: mainYoutube,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<HelmetProvider>
				<ScrollToTop />
				<App />
			</HelmetProvider>
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
