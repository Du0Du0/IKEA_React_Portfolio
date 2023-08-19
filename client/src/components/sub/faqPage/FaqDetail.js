import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { faHeart, faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutNone from '../../common/LayoutNone';
import { useEffect, useState, useRef } from 'react';
import CommentModal from '../CommentModal';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function FaqDetail() {
	const params = useParams();
	console.log('params', params);
	const [Detail, setDetail] = useState(null);
	const user = useSelector((state) => state.userReducer);

	useEffect(() => {
		axios
			.get('/faq/detail', params)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);

					// 작성자 정보 조회
					axios
						.get('/user', { uid: res.data.detail.writer })
						.then((response) => {
							if (response.data.success) {
							} else {
								console.log(response.data.message);
							}
						})
						.catch((err) => console.log(err));
				} else {
					alert('상세글 호출에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	}, [params]);

	//게시물 삭제
	const handleDelete = () => {
		if (!window.confirm('정말 삭제하겠습니까')) return;

		axios.delete('/delete', params).then((res) => {
			if (res.data.success) {
				alert('게시글이 삭제되었습니다.');
				history.push('/faq');
			} else {
				alert('게시글 삭제에 실패했습니다.');
			}
		});
	};

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

	return (
		<>
			<Helmet>
				<title>{Detail?.title}</title>
			</Helmet>
			<LayoutNone type={''} name1={'detail'}>
				<div className='listWrap'>
					<div className='titWrap'>
						<div className='titTop'>
							<h1>{Detail?.title}</h1>
						</div>
						<div className='titBottom'>
							<p>{Detail?.writer?.displayName}</p>
							<p>
								<FontAwesomeIcon icon={faCommentDots} />
								&nbsp;&nbsp;
								{/* {Detail.comments === undefined ? 0 : Detail.comments.length} */}
							</p>
							<p>
								<FontAwesomeIcon icon={faHeart} />
								&nbsp;&nbsp;
								{/* {TotalLikes} */}
							</p>
							<p>
								<FontAwesomeIcon icon={faClock} />
								&nbsp;&nbsp;
								{`${Detail?.publishedDate}`.substr(0, 10)}
							</p>
						</div>
					</div>

					<div className='contentWrap'>
						<p>{Detail?.content}</p>
						{Detail?.keyword && <p>{Detail.keyword}</p>}
					</div>
					<div className='buttonWrap'>
						{user.uid !== '' && (
							<>
								<button onClick={handleDelete}>삭제</button>
								<Link to={`/faq/update/${params.id}`}>
									<button>수정</button>
								</Link>
							</>
						)}

						<button onClick={() => history.push('/faq')}>목록</button>
					</div>
				</div>

				{/* <div className='commentWriteWrap'>
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
							<button>남기기</button>
						</div>
					</div>
					<div className='commentShowWrap'>
						<div className='commentShowTop'>
							<h3>
								댓글 <span>{Detail.comments ? Detail.comments.length : 0}</span>건
							</h3>

							<div className='commentSortBtn'>
								<button className={ActiveArrLatestBtn ? 'active' : ''}>최신순</button>
								<button className={!ActiveArrLatestBtn ? 'active' : ''}>공감순</button>
							</div>
						</div>

						{Detail.comments.map((comment, i) => (
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
												<p>삭제</p>
											</div>
											<div className='rightWrap'>
												<FontAwesomeIcon icon={faHeart} ref={likeBtn} />
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
													<button>저장</button>
													<button onClick={() => setAllowed({ ...Allowed, [i]: false })}>취소</button>
												</div>
											</div>
										</div>
									</>
								)}
							</React.Fragment>
						))}
					</div>
				</div> */}
			</LayoutNone>
		</>
	);
}

export default FaqDetail;
