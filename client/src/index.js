import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollTop';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalProvider } from './hooks/useGlobalContext';

ReactDOM.render(
	<HashRouter>
		<HelmetProvider>
			<ScrollToTop />
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</HelmetProvider>
	</HashRouter>,
	document.getElementById('root')
);
