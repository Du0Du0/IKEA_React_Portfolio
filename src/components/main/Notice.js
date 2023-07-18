import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBlog } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Notice() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const [Posts] = useState(getLocalData());

	return (
		<section id='notice' class='myScroll'>
			<div class='noticeContainer'>
				{/* left part   */}
				<div class='noticeWrap'>
					{/* section notice title  */}
					<h4>커뮤니티</h4>
					{/* go button start */}
					<div class='goBtn'>
						<Link to='/community'>
							<p>
								바로가기&nbsp;&nbsp;&nbsp;
								<span>
									<FontAwesomeIcon icon={faArrowRight} aria-hidden='true' />
								</span>
							</p>
						</Link>
					</div>
					{/* ipost.content post.contenttainer start */}
					<p class='iconWrap'>
						{/* facebook  */}
						<span>
							<a href='https://www.facebook.com/IKEA.kr/?locale=ko_KR' target='_blank' title='새창-이케아 코리아 페이스북' rel='noreferrer'>
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
						</span>
						{/* youtube  */}
						<span>
							<a href='https://www.youtube.com/channel/UCvt32qJUh606U-W_hr-EF7A' target='_blank' title='새창-이케아 코리아 유튜브' rel='noreferrer'>
								<FontAwesomeIcon icon={faYoutube} />
							</a>
						</span>
						{/* instagram  */}
						<span>
							<a href='https://www.instagram.com/ikeakr/' target='_blank' title='새창-이케아 코리아 인스타그램' rel='noreferrer'>
								<FontAwesomeIcon icon={faSquareInstagram} />
							</a>
						</span>
						{/* blog  */}
						<span>
							<a href='https://lifeathome.ikea.com/blog/' target='_blank' title='새창-이케아 미국 블로그' rel='noreferrer'>
								<FontAwesomeIcon icon={faBlog} />
							</a>
						</span>
					</p>
				</div>
				{/* right part  */}
				<div class='noticeWrap'>
					{Posts.map((post, idx) => {
						if (idx >= 4) return null;
						return (
							<>
								<div class='contentWrap' key={idx}>
									<div class='topic'>
										<p>{post.topic}</p>
									</div>
									<div class='titleWrap'>
										<h2>{post.title.length > 6 ? post.title.split(' ').splice(0, 6).join(' ') : post.title}</h2>
										<p>{`${post.date}`.substr(0, 10)}</p>
									</div>
									<div class='content'>
										<p>{post.content.length > 23 ? post.content.split(' ').splice(0, 23).join(' ') : post.content}</p>
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

export default Notice;
