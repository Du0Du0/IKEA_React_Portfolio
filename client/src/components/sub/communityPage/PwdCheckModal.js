import { useImperativeHandle, useEffect, forwardRef, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom';

function PwdCheckModal(props, ref) {
	const location = useLocation();
	const history = useHistory();
	const [IsOpen, setIsOpen] = useState(false);
	const [InputPassword, setInputPassword] = useState('');
	const [Err, setErr] = useState('');

	useImperativeHandle(ref, () => {
		return { toggle: () => setIsOpen(!IsOpen) };
	});

	useEffect(() => {
		setIsOpen(true);
	}, []);

	const getLocalComment = () => {
		const dataComment = localStorage.getItem('post');
		if (dataComment) {
			const postData = JSON.parse(dataComment);
			return postData.comments || [];
		} else {
			return [];
		}
	};

	const [Posts, setPosts] = useState(getLocalComment());

	useEffect(() => {
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);
		const { idx } = location.state || {};

		if (idx === undefined && localStorage.getItem('idx')) {
			const storedIdx = localStorage.getItem('idx');

			if (storedIdx >= '0' && storedIdx < posts.length) {
				setPosts(posts[storedIdx]);
			} else {
				history.push('/community');
			}
		} else {
			const selectedPost = posts && posts[idx];
			setPosts(selectedPost);
			// 처음 페이지 들어올 때 idx 값을 localStorage에 저장
			localStorage.setItem('idx', idx);

			// 기존에 저장된 'recent' 데이터 가져오기
			const recentData = localStorage.getItem('recent');
			let recentPosts = [];
			if (recentData) {
				recentPosts = JSON.parse(recentData);
			}

			// 새로운 데이터를 기존 데이터 배열에 추가
			recentPosts.push(selectedPost);

			// 최신 데이터를 다시 'recent'에 저장
			localStorage.setItem('recent', JSON.stringify(recentPosts));
		}
	}, [history, location.state]);

	const allowUpdate = (idx) => {
		if (Number(InputPassword) === Posts.password) {
			alert('비밀번호 인증이 완료되었습니다.');
			setInputPassword('');
			try {
				history.push({
					pathname: '/update',
					state: {
						...Posts,
					},
				});
				console.log(Posts);
				console.log(idx);
			} catch (err) {
				console.log('goToUpdateErr', err);
			}
		} else {
			setErr('잘못된 비밀번호 입니다');
			setInputPassword('');
		}
	};

	return (
		<aside id='pwdCheckModal' style={IsOpen ? { display: 'none' } : { display: 'block' }}>
			<div className='titleWrap'>
				<h1>비밀번호 인증</h1>
				<FontAwesomeIcon
					icon={faXmark}
					onClick={(e) => {
						setIsOpen(true);
						setErr('');
						setInputPassword('');
					}}
				/>
			</div>

			<ul>
				<li>게시물 비밀번호를 입력해주세요.</li>
				<input type='password' placeholder='비밀번호' value={InputPassword} onChange={(e) => setInputPassword(e.target.value)} />
				<p className='err'>{Err ? Err : ''}</p>
			</ul>
			<button onClick={allowUpdate}>인증하기</button>
		</aside>
	);
}

export default forwardRef(PwdCheckModal);
