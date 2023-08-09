import React from 'react';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share';

const SnsShareModal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const currentUrl = 'http://naver.com';
	const path = process.env.PUBLIC_URL;
	const { Kakao } = window;
	const JAVASCRIPT_API_KEY = process.env.REACT_APP_CLIENT_KAKAO_JAVASCRIPT_API_KEY;

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		const initKakao = async () => {
			const script = document.createElement('script');
			script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
			script.async = true;
			document.body.appendChild(script);

			script.onload = async () => {
				if (window.Kakao) {
					if (!window.Kakao.isInitialized()) {
						try {
							await window.Kakao.init(JAVASCRIPT_API_KEY);
							console.log('Kakao initialized');
						} catch (error) {
							console.error('Error initializing Kakao:', error);
						}
					}
				}
			};
		};

		initKakao();

		return () => {
			if (window.Kakao) {
				window.Kakao.cleanup();
			}
		};
	}, []);

	const shareKakao = () => {
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: '이케아(IKEA)',
				description: '(대표)',
				imageUrl: 'https://www.ikea.com/kr/ko/static/ikea-logo.f7d9229f806b59ec64cb.svg',
				link: {
					mobileWebUrl: 'https://Du0Du0.github.io/ikea-react',
				},
			},
			buttons: [
				{
					title: '이케아(IKEA)',
					link: {
						mobileWebUrl: 'https://Du0Du0.github.io/ikea-react',
					},
				},
			],
		});
	};

	const copyMessage = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			alert('클립보드에 복사 되었습니다.');
		} catch (err) {
			console.log('err', err);
		}
	};

	return (
		<>
			<div className='snsModalContainer' ref={ref} style={{ display: Open ? 'block' : 'none' }}>
				<div className='snsModalWrap'>
					<div className='snsShareTitWrap'>
						<h2>공유</h2>
						<button onClick={() => setOpen(false)}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>

					<div className='snsShareBtns'>
						<button onClick={shareKakao}>
							<img src={path + '/img/icon-kakao.png'} alt={'kakao share icon'} />
						</button>
						<FacebookShareButton url={currentUrl}>
							<FacebookIcon size={59} round={true} borderRadius={24}></FacebookIcon>
						</FacebookShareButton>
						<TwitterShareButton url={currentUrl}>
							<TwitterIcon size={59} round={true} borderRadius={24}></TwitterIcon>
						</TwitterShareButton>
					</div>
					<div className='snsShareLinkCopy'>
						<input type='text' defaultValue='https://munjang.or.kr/' readOnly />
						<button
							onClick={() => {
								copyMessage('https://munjang.or.kr/');
							}}
						>
							<FontAwesomeIcon icon={faCopy} style={{ color: '#ffffff' }} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
});

export default React.memo(SnsShareModal);
