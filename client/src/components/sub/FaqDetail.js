import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { faHeart, faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutNone from '../common/LayoutNone';
import { useEffect, useState, useRef } from 'react';
import CommentModal from './CommentModal';
import { Helmet } from 'react-helmet-async';

function FaqDetail() {
	const params = useParams();
	console.log(params);

	const history = useHistory();
	const location = useLocation();
	const [InputCount, setInputCount] = useState(0);
	const [UpdatenputCount, setUpdatenputCount] = useState(0);
	const noticeModal = useRef(null);
	const { idx } = useParams();
	const comment = useRef(null);
	const likeBtn = useRef(null);
	const [Allowed, setAllowed] = useState(true);
	const updateComment = useRef(null);
	const [ActiveArrLatestBtn, setActiveArrLatestBtn] = useState(true);

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

	const getLocalLikeBtn = () => {
		const dataComment = localStorage.getItem('post');
		if (dataComment) {
			const postData = JSON.parse(dataComment);
			return postData.likeBtn || 0;
		} else {
			return 0;
		}
	};

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
	}, [history, location.state, idx]);

	useEffect(() => {
		getLocalComment();
		getLocalLikeBtn();
	}, []);

	//게시물 삭제
	const deletePost = () => {
		const result = window.confirm('정말로 삭제하시겠습니까?');
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);

		if (result) {
			const { idx } = location.state || {};
			console.log('index는', idx);
			const copy = posts.filter((el, i) => i !== idx);
			setPosts(copy);
			// 로컬 스토리지에서도 데이터 삭제
			localStorage.setItem('post', JSON.stringify(copy));
			console.log('데이터 지움', copy);
			history.push('/community/articles');
		} else {
			return;
		}
	};

	//게시물 수정
	const goToUpdate = (idx) => {
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
	};

	// 댓글 초기화
	const resetComment = () => {
		comment.current.value = '';
	};

	//댓글 생성
	const creatComment = () => {
		const newComment = {
			comment: comment.current.value,
			date: new Date().toISOString(), // 날짜를 ISO 형식으로 저장 (현재 시간을 문자열로 변환)
			likeBtn: 0,
		};

		const updatedComments = [newComment, ...Posts.comments];

		const updatedPost = {
			...Posts,
			comments: updatedComments,
		};

		setPosts(updatedPost);

		// 로컬 스토리지에 댓글 업데이트
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);
		posts[idx] = updatedPost;

		// 변경된 Posts 배열을 로컬 스토리지에 저장
		localStorage.setItem('post', JSON.stringify(posts));

		resetComment();
		setInputCount(0);
	};

	//좋아요 버튼 카운트
	const likeBtnClickCount = (commentIndex) => {
		const updatedComments = Posts.comments.map((comment, i) => {
			if (i === commentIndex) {
				return {
					...comment,
					likeBtn: comment.likeBtn + 1,
				};
			}
			return comment;
		});

		const updatedPost = {
			...Posts,
			comments: updatedComments,
		};

		setPosts(updatedPost);

		// 로컬 스토리지에 댓글 업데이트
		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);
		posts[idx] = updatedPost;

		// 변경된 Posts 배열을 로컬 스토리지에 저장
		localStorage.setItem('post', JSON.stringify(posts));
	};

	const [TotalLikes, setTotalLikes] = useState(0); // 좋아요 총 갯수 상태

	const viewLikeNumber = () => {
		const idx = localStorage.getItem('idx');
		console.log(idx);

		return Posts.comments?.reduce((total, comments) => total + (comments.likeBtn || 0), 0);
	};

	useEffect(() => {
		setTotalLikes(viewLikeNumber());
		console.log('TotalLikes', TotalLikes);
	}, [likeBtnClickCount]);

	return (
		<>
			<Helmet>
				<title>{Posts.title}</title>
			</Helmet>
			<LayoutNone type={''} name1={'detail'}>
				<div className='listWrap'>
					<div className='titWrap'>
						<div className='titTop'>
							<h1>{Posts && Posts.title}</h1>
						</div>
						<div className='titBottom'>
							<p>{Posts && Posts.userId}</p>
							<p>
								<FontAwesomeIcon icon={faCommentDots} />
								&nbsp;&nbsp;
								{Posts.comments === undefined ? 0 : Posts.comments.length}
							</p>

							<p>
								<FontAwesomeIcon icon={faHeart} />
								&nbsp;&nbsp;
								{TotalLikes}
							</p>
							<p>
								<FontAwesomeIcon icon={faClock} />
								&nbsp;&nbsp;
								{`${Posts && Posts.date}`.substr(0, 10)}
							</p>
						</div>
					</div>

					<div className='contentWrap'>
						<p>{Posts && Posts.content}</p>
						<p>
							{Posts &&
								Posts.keyword &&
								Object.values(Posts.keyword)
									.join(',')
									.split(',')
									.map((word, index) => (
										<span key={index} className='keywordMap'>
											{'#' + word}{' '}
										</span>
									))}
						</p>
					</div>
					<div className='buttonWrap'>
						<button onClick={deletePost}>삭제</button>
						<button onClick={goToUpdate}>수정</button>
						<button onClick={() => history.push('/community/articles')}>목록</button>
					</div>
				</div>

				<div className='commentWriteWrap'>
					<div className='commentWriteTop'>
						<h2>댓글 남기기</h2>
						<h3
							onClick={() => {
								noticeModal.current.toggle();
								console.log('noticeModal.current', noticeModal.current);
							}}
						>
							<FontAwesomeIcon icon={faCircleExclamation} />
							글 작성 시 유의사항
							<FontAwesomeIcon icon={faAngleDown} />
						</h3>
						<CommentModal ref={noticeModal} />
					</div>
					<div className='commentWriteBottom border'>
						<textarea
							cols='30'
							rows='6'
							placeholder='로그인 후 남길 수 있어요. 문의사항을 댓글로 알려주세요! 욕설 및 인신공격성 글은 삭제될 수 있습니다.'
							maxLength={1500}
							ref={comment}
							onChange={(e) => {
								if (e.target.value.length > e.target.maxLength) {
									e.target.value = e.target.value.slice(0, e.target.maxLength);
								}
								setInputCount(e.target.value.length);
							}}
							onInput={(e) => {
								if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
							}}
						></textarea>
						<div className='textareaBottom'>
							<p>{InputCount}/1500</p>
							<button onClick={() => creatComment()}>남기기</button>
						</div>
					</div>
					<div className='commentShowWrap'>
						<div className='commentShowTop'>
							<h3>
								댓글 <span>{Posts.comments ? Posts.comments.length : 0}</span>건
							</h3>

							<div className='commentSortBtn'>
								<button
									className={ActiveArrLatestBtn ? 'active' : ''}
									onClick={() => {
										setActiveArrLatestBtn(true);
										const sortedComments = [...Posts.comments].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

										// 정렬된 결과를 Posts에 다시 저장
										const sortedPosts = { ...Posts, comments: sortedComments };

										setPosts(sortedPosts);
									}}
								>
									최신순
								</button>
								<button
									className={!ActiveArrLatestBtn ? 'active' : ''}
									onClick={() => {
										setActiveArrLatestBtn(false);
										const sortedComments = [...Posts.comments].sort((a, b) => a.likeBtn - b.likeBtn).reverse();

										// 정렬된 결과를 Posts에 다시 저장
										const sortedPosts = { ...Posts, comments: sortedComments };
										setPosts(sortedPosts);
									}}
								>
									공감순
								</button>
							</div>
						</div>

						{Posts &&
							Posts.comments &&
							Posts.comments.map((comment, i) => (
								<React.Fragment key={i}>
									{!Allowed[i] ? (
										<div className='commentList'>
											<div className='commentListTop'>
												<p>{comment.comment}</p>
											</div>
											<div className='commentListBottom'>
												<div className='leftWrap'>
													<p>{`${comment.date}`.substr(0, 10)}</p>
													<p onClick={() => setAllowed({ ...Allowed, [i]: true })}>수정</p>
													<p
														onClick={() => {
															const result = window.confirm('정말로 삭제하시겠습니까?');
															if (result) {
																const updatedComments = Posts.comments.filter((_, idx) => idx !== i);

																console.log('updatedComments', updatedComments);
																const updatedPost = {
																	...Posts,
																	comments: updatedComments,
																};

																setPosts(updatedPost);

																const data = localStorage.getItem('post');
																const posts = JSON.parse(data);
																posts[i].comments = updatedComments;
																localStorage.setItem('post', JSON.stringify(posts));
															} else {
																return;
															}
														}}
													>
														삭제
													</p>
												</div>
												<div className='rightWrap'>
													<FontAwesomeIcon
														icon={faHeart}
														ref={likeBtn}
														onClick={(e) => {
															e.stopPropagation();
															likeBtnClickCount(i);
														}}
													/>
													<span>{comment.likeBtn}</span>
												</div>
											</div>
										</div>
									) : (
										//출력모드
										<>
											<div className='commentList'>
												<div className='commentWriteBottom '>
													<textarea
														textarea
														cols='30'
														rows='6'
														defaultValue={comment.comment}
														maxLength={1500}
														ref={updateComment}
														onChange={(e) => {
															if (e.target.value.length > e.target.maxLength) {
																e.target.value = e.target.value.slice(0, e.target.maxLength);
															}
															setUpdatenputCount(e.target.value.length);
														}}
														onInput={(e) => {
															if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
														}}
													></textarea>
												</div>
												<div className='commentListBottom'>
													<div className='updateLeftWrap'>
														<p>{UpdatenputCount}/1500</p>
													</div>
													<div className='rightWrap'>
														<button
															onClick={() => {
																const updatedComment = {
																	comment: updateComment.current.value,
																	likeBtn: comment.likeBtn,
																	date: comment.date,
																};

																const updatedComments = [...Posts.comments];
																updatedComments[i] = updatedComment;

																const updatedPost = {
																	...Posts,
																	comments: updatedComments,
																};

																setPosts(updatedPost);

																const data = localStorage.getItem('post');
																const posts = JSON.parse(data);
																posts[idx] = updatedPost;

																localStorage.setItem('post', JSON.stringify(posts));

																resetComment();
																setUpdatenputCount(0);
																setAllowed({ ...Allowed, [i]: false });
															}}
														>
															저장
														</button>
														<button onClick={() => setAllowed({ ...Allowed, [i]: false })}>취소</button>
													</div>
												</div>
											</div>
										</>
									)}
								</React.Fragment>
							))}
					</div>
				</div>
			</LayoutNone>
		</>
	);
}

export default FaqDetail;
