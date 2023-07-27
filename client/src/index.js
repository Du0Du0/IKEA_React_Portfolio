import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollTop';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HelmetProvider } from 'react-helmet-async';

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
