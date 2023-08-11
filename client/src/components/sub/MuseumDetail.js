import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayoutNone from '../common/LayoutNone';
import { Helmet } from 'react-helmet-async';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MuseumDetail() {
	const history = useHistory();
	const location = useLocation();

	const [Index, setIndex] = useState(0);
	const museums = useSelector((store) => store.museumReducer.museum);

	useEffect(() => {
		const getIdx = localStorage.getItem('index');
		setIndex(parseInt(getIdx));
	}, []);

	console.log('museums', museums);
	console.log('Index', Index);
	return (
		<>
			<Helmet>
				<title>{museums[Index].title}</title>
			</Helmet>
			<LayoutNone type={''} name1={'detail'}>
				<div className='listWrap'>
					<div className='titWrap'>
						<div className='titTop'>
							<h1>{museums[Index].title}</h1>
						</div>
						<div className='titBottom'>
							<p>{museums[Index].topic}</p>
							<p>{museums[Index].topic}</p>
							<p>
								<FontAwesomeIcon icon={faClock} />
								&nbsp;&nbsp;
								{`${museums[Index].date}`.substr(0, 10)}
							</p>
						</div>
					</div>

					<div className='contentWrap'>
						<p>{museums[Index].content}</p>
						{/* <p>
							{museums?.keyword &&
								Object.values(museums.keyword)
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

export default MuseumDetail;
