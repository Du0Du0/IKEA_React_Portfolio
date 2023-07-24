import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share';

const SnsShareModal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const currentUrl = 'http://naver.com';
	const path = process.env.PUBLIC_URL;
	const { Kakao } = window;

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		// Kakao SDK 스크립트 로드
		const script = document.createElement('script');
		script.src = '//developers.kakao.com/sdk/js/kakao.min.js';
		script.async = true;
		document.body.appendChild(script);

		// 컴포넌트가 언마운트될 때 스크립트 제거
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (window.Kakao) {
			const kakao = window.Kakao;
			if (!kakao.isInitialized()) {
				Kakao.init('be0e6a448d5b266e02a1457647324d73'); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
			}
		}
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
							<img src={path + '/img/icon-kakao.png'} />
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

export default SnsShareModal;
