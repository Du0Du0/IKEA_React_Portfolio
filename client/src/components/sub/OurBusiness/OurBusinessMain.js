import LayoutNone from '../../common/LayoutNone';
import CircleWorldGlobe from './CircleWorldGlobe.js.js';
import { Helmet } from 'react-helmet-async';
import RetailSales from './RetailSales';
import SummaryFY22 from './SummaryFY22';
import LocationMap from './LocationMap';
import OnlineSales from './OnlineSales';

function OurBusinessMain() {
	return (
		<>
			<Helmet>
				<title>비즈니스</title>
			</Helmet>
			<LayoutNone type={'bl'} name1={'ourBusiness'} name2={'비즈니스'} video={'pexels.mp4'}>
				<CircleWorldGlobe />
				<SummaryFY22 />
				<RetailSales />
				<LocationMap />
				<OnlineSales />
			</LayoutNone>
		</>
	);
}

export default OurBusinessMain;
