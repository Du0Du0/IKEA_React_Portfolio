import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const handleOpenNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};
	const path = process.env.PUBLIC_URL;
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);
	const modal = useRef(null);

	const fetchYoutube = async () => {
		const key = 'AIzaSyCKs11Yu98hp6fq7N54tY2iWSY9qvTh4cM';
		const list = 'PLWgHnOZUp_4FJWdMzYeEAM4Waf8IhnZCB';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		const result = await axios.get(url);
		setVids(result.data.items);
	};
	useEffect(() => fetchYoutube(), []);
	return (
		<>
			<Layout type={'bl'} name1={'youtube'} name2={'유투브'} video={'pexels.mp4'}>
				<section className='contents videoSub'>
					{/* youtube page subtitle left side*/}
					<div className='subtitle myScroll'>
						<div className='subLeft'>
							<h3>The OBEGRÄNSAD collection</h3>
							<div className='title'>
								<h2>Find your sound</h2>
							</div>
							<p>
								Home is the new studio! Created together with electronic music artists, Swedish House Mafia, this just-launched collection helps music makers and other creatives to find their state of
								flow, wherever they call home.
							</p>
							<img src={path + '/img/arrowDown.png'} alt='arrow down icon' />
						</div>
						{/* youtube subtitle right side */}
						<figure className='subRight'>
							<div className='videoBtnContainer'>
								<span>
									<button className='pauseBtn'>
										<img src={path + '/img/pauseWhite.png'} alt='video pause button' />
									</button>
								</span>
								<span>
									<button className='playBtn'>
										<img src={path + '/img/playWhite.png'} alt='video play button' />
									</button>
								</span>
							</div>
							<video className='vidSubTit' autoPlay muted loop data-name='Pause'>
								<source src={path + '/img/SHM.mp4'} type='video/mp4' />
							</video>
						</figure>
					</div>
					<div className='middleText myScroll'>
						<p>
							Almost every musician – even Swedish House Mafia – started out at home. Maybe with just a guitar in the garage, a voice in front of the mirror, or on a laptop in the living room. With
							the new OBEGRÄNSAD collection, on sale around the world from 1 October, it has never been simpler to make room for creativity in the space you already have.
						</p>
						<button className='btnWrap' data-name='Collections' onClick={() => handleOpenNewTab('https://www.ikea.com/kr/ko/cat/collection-collections/')}>
							See all collections at IKEA.kr
						</button>
					</div>

					<div className='imgBoxContainer myScroll'>
						<figure className='imgBoxLeft'>
							<div className='videoBtnContainer2'>
								<span>
									<button className='pauseBtn2'>
										<img src={path + '/img/pauseWhite.png'} alt='video pause button' />
									</button>
								</span>
								<span>
									<button className='playBtn2'>
										<img src={path + '/img/pauseWhite.png'} alt='video play button' />
									</button>
								</span>
							</div>
							<video className='vidImgBox' autoPlay muted loop data-name='Pause'>
								<source src={path + '/img/imgBoxRight_video.mp4'} />
							</video>
						</figure>

						<div className='imgBoxRight'>
							<div className='imgBoxTop'>
								<div className='imgBox1' data-name='Click'>
									<img className='changeImg' src={path + '/img/imgBoxGroup1.png'} alt='Black OBEGRÄNSAD armchair on a black background.' />

									<button>
										<span id='result'>1</span>&nbsp;/&nbsp;5
									</button>
								</div>
								<div className='imgBox2'>
									<img src={path + '/img/video_imgBox2.png'} alt='OBEGRÄNSAD team meeting' />
								</div>
							</div>
							<div className='imgBoxDown'>
								<img src={path + '/img/video_imgBox3.png'} alt='eager' />
							</div>
						</div>
					</div>

					<div className='bannerBox'>
						<div className='bannerleft'></div>
						<div className='bannerRight'></div>
					</div>

					<div className='imbedVideoContainer myScroll'>
						<div className='imbedText'>
							<h2>Unlimited creativity for those with limited means</h2>
							<p>A desk, an armchair and even a record player! Meet these and many more stars from the new OBEGRÄNSAD collection.</p>
						</div>
						<div className='imbedVideo'>
							<iframe
								width='787.5'
								height='453.39'
								src='https://www.youtube.com/embed/qFnEbDsbdRE?cc_load_policy=0&autoplay=1&mute=1&playsinline=1&rel=0&loop=1&autohide=1&playlist=qFnEbDsbdRE&controls=0'
								title='OBEGRÄNSAD collection feat. IKEA and Swedish House Mafia'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
							></iframe>
							<div className='cursorOverlay' data-name='Pause'></div>
						</div>
					</div>
					<div className=' btnContainer'>
						<button data-name='Collections' onClick={() => handleOpenNewTab('https://www.ikea.com/kr/ko/cat/collection-collections/')}>
							See all collections at IKEA.kr
						</button>
					</div>

					<div className='videoListContainer myScroll'>
						<div className='container'>
							{Vids.map((vid, idx) => {
								return (
									<div className='videoBox1' key={idx}>
										<div
											className='videoCircle'
											onClick={() => {
												modal.current.open();
												setIndex(idx);
											}}
										>
											<img src={vid.snippet.thumbnails.maxres.url} alt={vid.snippet.title} data-video-id={vid.snippet.resourceId.videoId} data-cursor='link' data-name='Show Video' />
										</div>
										<div className='textBox'>
											<span className='listTitle'>{vid.snippet.title.length > 4 ? vid.snippet.title.split(' ').splice(0, 4).join(' ') : vid.snippet.title}</span>
											<p>{vid.snippet.publishedAt.substr(0, 10)}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className='cursor'></div>

					<button className='goTopBtn'> Go Top </button>
				</section>
			</Layout>
			<Modal ref={modal}>
				<iframe title={Vids[Index]?.id} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
