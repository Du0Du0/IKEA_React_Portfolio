import Layout from '../common/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import StoreName from './StoreName';

function Contact() {
	return (
		<Layout name1={'contact'} name2={'매장 찾기'} video={'pexels.mp4'}>
			<StoreName />
			<div className='promotionWrap'>
				<div className='promotionTit'>제목</div>
				<div className='eventWrap'>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
					<div className='eventBox'>1</div>
				</div>
			</div>

			<div className='locationContainer'>
				<div className='titWrap'>
					<h3>오시는 길</h3>

					<div className='tabMenu'>
						<ul>
							<li>주차안내</li>
							<li>지하철</li>
							<li>버스</li>
						</ul>
					</div>

					<div className='mapContainer'>
						<div id='map'>map</div>
						<div className='addressDesc'>주소</div>

						<div className='leftInfo'></div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Contact;
