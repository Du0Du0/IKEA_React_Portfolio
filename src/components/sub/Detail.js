import React from 'react';
import Community from './Community';
import { useHistory, useLocation } from 'react-router-dom';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutNone from '../common/LayoutNone';
import { useEffect, useState, useRef } from 'react';
import Write from './Write';

function Detail(props) {
	const history = useHistory();
	const location = useLocation();
	const [Posts, setPosts] = useState([]);
	const [LikeBtn, setLikeBtn] = useState([0, 0, 0, 0, 0, 0, 0]);

	const { idx } = location.state || {};
	const comment = useRef(null);

	const dummyComments = [
		{ comment: '안녕하세요', date: '2023-07-08' },
		{ comment: '안녕하세요', date: '2023-07-08' },
		{ comment: '안녕하세요', date: '2023-07-08' },
		{ comment: '안녕하세요', date: '2023-07-08' },
		{ comment: '안녕하세요', date: '2023-07-08' },
	];

	const getLocalComment = () => {
		const dataComment = localStorage.getItem('comment');
		if (dataComment) return JSON.parse(dataComment);
		else return dummyComments;
	};

	const [Comments, setComments] = useState(getLocalComment());

	useEffect(() => {
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);
		console.log(data);
		const { idx } = location.state || {};

		if (idx === undefined && localStorage.getItem('idx')) {
			// 새로고침 후에도 idx 값을 유지하기 위해 localStorage에서 가져옴
			const storedIdx = localStorage.getItem('idx');

			if (storedIdx >= '0' && storedIdx < posts.length) {
				setPosts(posts[storedIdx]);
			} else {
				history.push('/community');
			}
		} else {
			console.log('idx', idx);
			const selectedPost = posts && posts[idx];
			setPosts(selectedPost);
			// 처음 페이지 들어올 때 idx 값을 localStorage에 저장
			localStorage.setItem('idx', idx);
		}
	}, [history, location.state, idx]);

	useEffect(() => {
		localStorage.getItem('comment');
	}, [Comments]);

	//게시물 삭제하는 기능
	const deletePost = () => {
		const result = window.confirm('정말로 삭제하시겠습니까?');
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);
		console.log('posts는', posts);
		if (result) {
			const { idx } = location.state || {};
			console.log('index는', idx);
			const copy = posts.filter((el, i) => i !== idx);
			setPosts(copy);
			// 로컬 스토리지에서도 데이터 삭제
			localStorage.setItem('post', JSON.stringify(copy));
			console.log('데이터 지움', copy);
			history.push('/community');
		} else {
			return;
		}
	};

	//게시물 수정하기 버튼 클릭 시
	const goToUpdate = (idx) => {
		history.push({
			pathname: '/update',
			state: {
				...Posts,
			},
		});
		console.log(Posts);
		console.log(idx);
	};

	// 댓글 초기화
	const resetComment = () => {
		comment.current.value = '';
	};

	// 댓글 삭제하기
	const deleteComment = (delIndex) => {
		const result = window.confirm('정말로 삭제하시겠습니까?');
		const data = localStorage.getItem('comment');
		const comments = JSON.parse(data);

		if (result) {
			console.log('index는', idx);
			const copy = comments.filter((el, i) => i !== delIndex);
			setComments(copy);
			// 로컬 스토리지에서도 데이터 삭제
			localStorage.setItem('comment', JSON.stringify(copy));
			console.log('데이터 지움', copy);
		} else {
			return;
		}
	};

	//댓글 생성하는 기능
	const creatComment = () => {
		const newComment = {
			comment: comment.current.value,
			date: new Date(),
		};

		const updatedComment = [newComment, ...Comments];
		setComments(updatedComment);
		localStorage.setItem('comment', JSON.stringify(updatedComment));
		resetComment();
	};

	return (
		<LayoutNone type={''} name1={'detail'}>
			<div className='listWrap'>
				<div className='titWrap'>
					<div className='titTop'>
						<h1>{Posts && Posts.title}</h1>
					</div>
					<div className='titBottom'>
						<p>{Posts && Posts.userId}</p>
						<p>{Posts && Posts.topic}</p>
						<p>{`${Posts && Posts.date}`.substr(0, 10)}</p>
					</div>
				</div>

				<div className='contentWrap'>
					<p>{Posts && Posts.content}</p>
					<p>
						{Posts &&
							Posts.keyword &&
							Object.values(Posts.keyword.split(',')).map((word, index) => (
								<span key={index} className='keywordMap'>
									{word.trim()}{' '}
								</span>
							))}
					</p>
					{/* <p>
						<FontAwesomeIcon icon={faHeart} />0
					</p> */}
				</div>
				<div className='buttonWrap'>
					<button onClick={deletePost}>삭제</button>
					<button onClick={goToUpdate}>수정</button>
					<button onClick={() => history.push('/community')}>목록</button>
				</div>
			</div>

			<div className='commentWriteWrap'>
				<div className='commentWriteTop'>
					<h2>댓글 남기기</h2>
					<h3>
						<FontAwesomeIcon icon={faCircleExclamation} />
						글 작성 시 유의사항
						<FontAwesomeIcon icon={faAngleDown} />
					</h3>
				</div>
				<div className='commentWriteBottom'>
					<textarea cols='30' rows='6' placeholder='로그인 후 남길 수 있어요. 문의사항을 댓글로 알려주세요! 욕설 및 인신공격성 글은 삭제될 수 있습니다.' ref={comment}></textarea>
					<div className='textareaBottom'>
						<p>0/1500</p>
						<button onClick={creatComment}>남기기</button>
					</div>
				</div>
				<div className='commentShowWrap'>
					<div className='commentShowTop'>
						<h3>
							댓글 <span>{Comments.length}</span>건
						</h3>

						<div className='commentSortBtn'>
							<button
								className='active'
								onClick={() => {
									const copyPosts = [...Comments];
									const ascDate = copyPosts.sort((a, b) => a - b);
									console.log('댓글최신순정렬');
									setComments(ascDate);
								}}
							>
								최신순
							</button>
							<button>공감순</button>
						</div>
					</div>

					{Comments.map((comment, i) => {
						return (
							<>
								<div className='commentList' key={i}>
									<div className='commentListTop'>
										<p>{comment.comment}</p>
									</div>
									<div className='commentListBottom'>
										<div className='leftWrap'>
											<p>{`${Posts && Posts.date}`.substr(0, 10)}</p>
											<p>수정</p>
											<p onClick={(e) => deleteComment(i)}>삭제</p>
										</div>

										<div className='rightWrap'>
											<FontAwesomeIcon
												icon={faHeart}
												onClick={(e) => {
													e.stopPropagation();
													let copy = [...LikeBtn];
													copy[i] = copy[i] + 1;
													setLikeBtn(copy);
												}}
											/>
											<span>{LikeBtn[i]}</span>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</LayoutNone>
	);
}

export default Detail;
