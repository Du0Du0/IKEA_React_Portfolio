import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollTop';

ReactDOM.render(
	<HashRouter>
		<ScrollToTop />
		<App />
	</HashRouter>,
	document.getElementById('root')
);
