import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBlog } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';

function MainCommunity() {
	const history = useHistory();

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const [Posts] = useState(getLocalData());

	const goToDetail = (idx) => {
		try {
			history.push({
				pathname: '/detail',
				state: {
					Posts: [...Posts],
					idx: idx,
				},
			});
			console.log('Posts', Posts);
			console.log('idx', idx);
		} catch (err) {
			console.log('goToDetailErr', err);
		}
	};

	const openNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};

	return (
		<section id='mainCommunity' className='myScroll'>
			<div className='mainCommContainer'>
				{/* left part   */}
				<div className='mainCommTitWrap'>
					<h4>커뮤니티</h4>
					<div className='goBtn'>
						<Link to='/community'>
							<p>
								바로가기&nbsp;&nbsp;&nbsp;
								<span>
									<FontAwesomeIcon icon={faArrowRight} aria-hidden={true} />
								</span>
							</p>
						</Link>
					</div>
					{/* icons */}
					<p className='iconWrap'>
						{/* facebook  */}
						<span>
							<FontAwesomeIcon
								icon={faFacebookF}
								onClick={() => {
									openNewTab('https://www.facebook.com/IKEA.kr/?locale=ko_KR');
								}}
							/>
						</span>
						{/* youtube  */}
						<span>
							<FontAwesomeIcon
								icon={faYoutube}
								onClick={() => {
									openNewTab('https://www.youtube.com/channel/UCvt32qJUh606U-W_hr-EF7A');
								}}
							/>
						</span>
						{/* instagram  */}
						<span>
							<FontAwesomeIcon
								icon={faSquareInstagram}
								onClick={() => {
									openNewTab('https://www.instagram.com/ikeakr/');
								}}
							/>
						</span>
						{/* blog  */}
						<span>
							<FontAwesomeIcon
								icon={faBlog}
								onClick={() => {
									openNewTab('https://lifeathome.ikea.com/blog/');
								}}
							/>
						</span>
					</p>
				</div>
				{/* right part  */}
				<div className='articleLists'>
					{Posts.map((post, idx) => {
						if (idx >= 4) return null;
						return (
							<>
								<div className='articleList' key={idx}>
									<div className='articleTopic'>
										<p>{post.topic}</p>
									</div>
									<div className='articleTitDate'>
										<h2 onClick={() => goToDetail(idx)}>{post.title.length > 6 ? post.title.split(' ').splice(0, 6).join(' ') : post.title}</h2>
										<p>{`${post.date}`.substr(0, 10)}</p>
									</div>
									<div className='articleContent'>
										<p onClick={() => goToDetail(idx)}>{post.content.length > 21 ? post.content.split(' ').splice(0, 21).join(' ') + '...' : post.content}</p>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default MainCommunity;
