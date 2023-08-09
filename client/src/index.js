import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollTop';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import flickrReducer from './redux-toolkit/flickerSlice';
import menuReducer from './redux-toolkit/menuSlice';

const store = configureStore({
	reducer: {
		flickr: flickrReducer,
		menu: menuReducer,
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
