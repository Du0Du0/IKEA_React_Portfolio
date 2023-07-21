import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';

function Youtube() {
	const SubVids = useSelector((store) => store.subYoutubeReducer.subYoutube);
	console.log(SubVids);
	const [Index, setIndex] = useState(0);
	const modal = useRef(null);

	const handleOpenNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};
	const path = process.env.PUBLIC_URL;
	const [ImgNum, setImgNum] = useState(1);
	const imgBox = useRef(null);
	const [ImgSrc, setImgSrc] = useState(process.env.PUBLIC_URL + '/img/imgBoxGroup1.png');

	const ImgBoxClick = () => {
		const imgBoxGroups = ['imgBoxGroup1.png', 'imgBoxGroup2.png', 'imgBoxGroup3.png', 'imgBoxGroup4.png', 'imgBoxGroup5.png'];

		if (ImgNum > imgBoxGroups.length - 1) {
			setImgNum(1);
		} else {
			setImgNum(ImgNum + 1);
		}

		setImgSrc(process.env.PUBLIC_URL + `/img/${imgBoxGroups[ImgNum]}`);
	};

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
								<div className='imgBox1' data-name='Click' ref={imgBox} onClick={ImgBoxClick}>
									<img className='changeImg' src={ImgSrc} alt='Black OBEGRÄNSAD armchair on a black background.' />

									<button>
										<span id='result'>{ImgNum}</span>&nbsp;/&nbsp;5
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
							{SubVids.map((subVid, idx) => {
								return (
									<div className='videoBox1' key={idx}>
										<div
											className='videoCircle'
											onClick={() => {
												modal.current.open();
												setIndex(idx);
											}}
										>
											<img src={subVid.snippet.thumbnails.maxres.url} alt={subVid.snippet.title} data-video-id={subVid.snippet.resourceId.videoId} data-cursor='link' data-name='Show Video' />
										</div>
										<div className='textBox'>
											<span className='listTitle'>{subVid.snippet.title.length > 4 ? subVid.snippet.title.split(' ').splice(0, 4).join(' ') : subVid.snippet.title}</span>
											<p>{subVid.snippet.publishedAt.substr(0, 10)}</p>
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
				<iframe title={SubVids[Index]?.id} src={`https://www.youtube.com/embed/${SubVids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
