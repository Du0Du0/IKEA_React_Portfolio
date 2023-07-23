import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

function Vids() {
	const MainPageYoutube = useSelector((store) => store.mainYoutubeReducer.mainYoutube);
	console.log(MainPageYoutube);

	const [SelectedIdx, setSelectedIdx] = useState(0);
	const videoRefs = useRef(null);

	return (
		<section id='vids' className='myScroll'>
			<div className='vidsContainer'>
				<div className='vidsTextWrap'>
					{/* video page title  */}
					<div className='vidsTit'>
						<h2>비디오</h2>
					</div>
					{/* video page description  */}
					<div class='vidsSub'>
						Lorem ipsum dolor sit amet consectetur <strong>adipisicing</strong> elit. Atque,
						<strong>suscipit?</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit?Lorem ipsu
					</div>
				</div>
				{/* video list start  */}
				<div className='vidsVideoWrap'>
					{MainPageYoutube.map((mainVid, idx) => {
						// if (idx >= 4) return null;

						return (
							<div
								className={`video ${SelectedIdx === idx ? 'on' : ''}`}
								data-video-id={mainVid.snippet.resourceId.videoId}
								style={{ backgroundImage: `url(${mainVid.snippet.thumbnails.maxres.url})` }}
								onClick={() => setSelectedIdx(idx)}
								ref={videoRefs}
							>
								<div className='vidsNum' style={{ display: SelectedIdx === idx ? 'none' : 'block' }}>
									{mainVid.snippet.position + 1}
								</div>
								<div className='vidsBarTit' style={{ display: SelectedIdx === idx ? 'none' : 'block' }}>
									{(mainVid.snippet.title.length > 15 ? mainVid.snippet.title.substr(0, 20) : mainVid.snippet.title) + '...'}
								</div>

								<span className='vidsOnSpan' style={{ display: SelectedIdx === idx ? 'block' : 'none' }}>
									<h4>{(mainVid.snippet.position + 1).toString().padStart(2, 0)}.</h4>
									<h2>{(mainVid.snippet.title.length > 50 ? mainVid.snippet.title.substr(0, 50) : mainVid.snippet.title) + '...'}</h2>
									<p>{(mainVid.snippet.description.length > 50 ? mainVid.snippet.description.substr(0, 250) : mainVid.snippet.description) + '...'}</p>
								</span>
								<button className='discoverBtn' style={{ display: SelectedIdx === idx ? 'block' : 'none' }}>
									Discover Now
								</button>
							</div>
						);
					})}
				</div>
				{/* video "see more video" button  */}

				<p>
					<a href='video.html'>
						바로가기 &nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</a>
				</p>
			</div>
		</section>
	);
}

export default Vids;
