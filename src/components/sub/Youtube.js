import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';
import TopButton from '../common/TopButton';

function Youtube() {
	const path = process.env.PUBLIC_URL;
	const SubVids = useSelector((store) => store.subYoutubeReducer.subYoutube);
	const [Index, setIndex] = useState(0);
	const [ImgSrc, setImgSrc] = useState('');
	const [IsPlay1, setIsPlay1] = useState(false);
	const [IsPlay2, setIsPlay2] = useState(false);
	const [ImgNum, setImgNum] = useState(1);
	const [CursorStyle, setCursorStyle] = useState({ top: 0, left: 0 });
	const [Clicking, setClicking] = useState(false);
	const [CursorText, setCursorText] = useState('');
	const modal = useRef(null);
	const customCursor = useRef(null);
	const imgBox = useRef(null);
	const subTitVid = useRef(null);
	const vidImgBox = useRef(null);

	const openNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};

	const cursorMouseOver = (e) => {
		const dataName = e.target.getAttribute('data-name');
		setCursorText(dataName);

		if (customCursor.current) {
			customCursor.current.innerText = dataName;
		}
	};

	const cursorMouseLeave = () => {
		setCursorText('');
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			setCursorStyle({ top: e.pageY - 50, left: e.pageX - 50 });
		};

		const handleClick = (e) => {
			console.log(e.target);
			setClicking(true);

			setTimeout(() => {
				setClicking(false);
			}, 500);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', cursorMouseOver);
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', cursorMouseLeave);
			document.removeEventListener('click', handleClick);
		};
	}, []);

	useEffect(() => {
		const imgBoxGroups = ['imgBoxGroup1.png', 'imgBoxGroup2.png', 'imgBoxGroup3.png', 'imgBoxGroup4.png', 'imgBoxGroup5.png'];
		setImgSrc(process.env.PUBLIC_URL + `/img/${imgBoxGroups[ImgNum - 1]}`);
	}, [ImgNum]);

	const ImgBoxClick = () => {
		const imgBoxGroups = ['imgBoxGroup1.png', 'imgBoxGroup2.png', 'imgBoxGroup3.png', 'imgBoxGroup4.png', 'imgBoxGroup5.png'];

		setImgNum((prevImgNum) => {
			if (prevImgNum >= imgBoxGroups.length) {
				return 1;
			} else {
				return prevImgNum + 1;
			}
		});

		setImgSrc(process.env.PUBLIC_URL + `/img/${imgBoxGroups[ImgNum]}`);
	};

	const videoPlayToggle1 = () => {
		setIsPlay1((IsPlay1) => !IsPlay1);
		if (IsPlay1) {
			subTitVid.current.play();
		} else {
			subTitVid.current.pause();
		}
	};

	const videoPlayToggle2 = () => {
		setIsPlay2((IsPlay2) => !IsPlay2);
		if (IsPlay2) {
			vidImgBox.current.play();
		} else {
			vidImgBox.current.pause();
		}
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
									<button className='pauseBtn' onClick={videoPlayToggle1} style={{ display: IsPlay1 ? 'none' : 'block' }} data-name='Pause'>
										<img src={path + '/img/pauseWhite.png'} alt='video pause button' />
									</button>
								</span>
								<span>
									<button className='playBtn' onClick={videoPlayToggle1} style={{ display: IsPlay1 ? 'block' : 'none' }} data-name='Play'>
										<img src={path + '/img/playWhite.png'} alt='video play button' />
									</button>
								</span>
							</div>
							<video className='vidSubTit' autoPlay muted loop ref={subTitVid}>
								<source src={path + '/img/SHM.mp4'} type='video/mp4' />
							</video>
						</figure>
					</div>
					<div className='middleText myScroll'>
						<p>
							Almost every musician – even Swedish House Mafia – started out at home. Maybe with just a guitar in the garage, a voice in front of the mirror, or on a laptop in the living room. With
							the new OBEGRÄNSAD collection, on sale around the world from 1 October, it has never been simpler to make room for creativity in the space you already have.
						</p>
						<button className='btnWrap' data-name='Go site' onClick={() => openNewTab('https://www.ikea.com/kr/ko/cat/collection-collections/')}>
							See all collections at IKEA.kr
						</button>
					</div>

					<div className='imgBoxContainer myScroll'>
						<figure className='imgBoxLeft'>
							<div className='videoBtnContainer2'>
								<span>
									<button className='pauseBtn2' onClick={videoPlayToggle2} style={{ display: IsPlay2 ? 'none' : 'block' }} data-name='Pause'>
										<img src={path + '/img/pauseWhite.png'} alt='video pause button' />
									</button>
								</span>
								<span>
									<button className='playBtn2' onClick={videoPlayToggle2} style={{ display: IsPlay2 ? 'block' : 'none' }}>
										<img src={path + '/img/playWhite.png'} alt='video play button' data-name='Play' />
									</button>
								</span>
							</div>
							<video className='vidImgBox' autoPlay muted loop ref={vidImgBox}>
								<source src={path + '/img/imgBoxRight_video.mp4'} />
							</video>
						</figure>

						<div className='imgBoxRight'>
							<div className='imgBoxTop'>
								<div className='imgBox1' ref={imgBox} onClick={ImgBoxClick}>
									<img className='changeImg' src={ImgSrc} alt='Black OBEGRÄNSAD armchair on a black background.' data-name='Click' />

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
							<div className='cursorOverlay'></div>
						</div>
					</div>
					<div className=' btnContainer'>
						<button data-name='Go site' onClick={() => openNewTab('https://www.ikea.com/kr/ko/cat/collection-collections/')}>
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
											<img src={subVid.snippet.thumbnails.maxres.url} alt={subVid.snippet.title} data-video-id={subVid.snippet.resourceId.videoId} data-name='Watch' />
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

					<div className={`cursor ${Clicking ? 'click' : ''}   ${CursorText ? 'hover' : ''}`} style={CursorStyle} ref={customCursor} />
					<TopButton />
				</section>
			</Layout>
			<Modal ref={modal}>
				<iframe title={SubVids[Index]?.id} src={`https://www.youtube.com/embed/${SubVids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
