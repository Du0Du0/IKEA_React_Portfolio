import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayoutNone from '../common/LayoutNone';
import { Helmet } from 'react-helmet-async';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PromotionDetail() {
	const history = useHistory();
	const location = useLocation();

	const [Index, setIndex] = useState(0);
	const promotions = useSelector((store) => store.promotionReducer.promotion);

	useEffect(() => {
		const getIdx = localStorage.getItem('index');
		setIndex(parseInt(getIdx));
	}, []);

	console.log('promotions', promotions);
	console.log('Index', Index);
	return (
		<>
			<Helmet>
				<title>뮤지엄 상세페이지</title>
			</Helmet>
			<LayoutNone type={''} name1={'detail'}>
				<div className='listWrap'>
					<div className='titWrap'>
						<div className='titTop'>
							<h1>{promotions[Index].title}</h1>
						</div>
						<div className='titBottom'>
							<p>{promotions[Index].user}</p>
							<p>{promotions[Index].topic}</p>
							<p>
								<FontAwesomeIcon icon={faClock} />
								&nbsp;&nbsp;
								{`${promotions[Index].date}`.substr(0, 10)}
							</p>
						</div>
					</div>

					<div className='contentWrap'>
						<p>{promotions[Index].content}</p>
						{/* <p>
							{museum?.keyword &&
								Object.values(museum.keyword)
									.join(',')
									.split(',')
									.map((word, index) => (
										<span key={index} className='keywordMap'>
											{'#' + word}{' '}
										</span>
									))}
						</p> */}
					</div>
					<div className='buttonWrap'>
						<button onClick={() => history.goBack()}>목록</button>
					</div>
				</div>
			</LayoutNone>
		</>
	);
}

export default PromotionDetail;
