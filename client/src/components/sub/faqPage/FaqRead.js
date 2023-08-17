import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState, useRef } from 'react';
import LayoutNone from '../../common/LayoutNone';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FaqRead() {
	const history = useHistory();
	const today = moment();
	const [Posts, setPosts] = useState([]);
	const [Search, setSearch] = useState(false);

	const user = useSelector((state) => state.userReducer);

	console.log('user', user);
	useEffect(() => {
		axios.get('/api/faq/lists').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);

	// pagination
	const [Currentpage, setCurrentpage] = useState(1);
	const [postPerPage] = useState(8);
	const indexOfLastPost = Currentpage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;

	//article date fillter
	const startDateRef = useRef(null);
	const endDateRef = useRef(null);
	const ignoreDateRef = useRef(null);
	const [IgnoreCheck, setIgnoreCheck] = useState(false);
	const [ActiveDateBtn, setActiveDateBtn] = useState(null);
	const activeDateBtnStyle = {
		background: '#606060',
		color: '#fff',
	};
	const oneWeekAgo = moment().subtract(1, 'weeks');
	const oneMonthAgo = moment().subtract(1, 'months');
	const threeMonthsAgo = moment().subtract(3, 'months');
	const oneWeekBtn = useRef(null);
	const oneMonthBtn = useRef(null);
	const threeMonthBtn = useRef(null);

	// article naming fillter
	const searchTopic = useRef(null);
	const searchWhat = useRef(null);
	const searchInput = useRef(null);

	// fillter display screen
	const [NotFoundErr, setNotFoundErr] = useState('');
	const [ShowArticleLists, setShowArticleLists] = useState(true);

	// article lists type
	const [IsListType, setIsListType] = useState(false);

	const currentPosts = Posts.slice(indexOfFirstPost, indexOfLastPost);

	const goToDetail = (idx) => {
		history.push({
			pathname: `/community/articles/${idx}`,
			state: {
				Posts: [...Posts],
				idx: idx,
			},
		});
		console.log(Posts);
		console.log(idx);
	};

	const pageChange = (page) => {
		setCurrentpage(page);
	};

	//검색1. 시작날짜, 마지막날짜 설정 후 맞는 조건 게시물 필터링
	const handleSubmitKeyDown = (e) => {
		searchDateInput();
		searchArticleKeyDown(e);
		setSearch(true);
		console.log('Search', Search);
	};

	console.log('Search', Search);

	const handleSubmitClick = () => {
		searchDateInput();
		searchArticleClick();
		setSearch(true);
	};

	const searchDateInput = () => {
		const startDate = startDateRef.current.value;
		const endDate = endDateRef.current.value;

		if (startDate && endDate) {
			const matchDatePosts = Posts.filter((post) => {
				// post.date 값을 Date 객체로 변환하여 검색 날짜와 비교
				const postDate = new Date(post.date);
				const start = new Date(startDate);
				const end = new Date(endDate);
				return postDate >= start && postDate <= end;
			});

			if (matchDatePosts === null) setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			else setPosts(matchDatePosts);
		}
	};

	const searchArticleKeyDown = (e) => {
		let copy = [...Posts];
		const selectedTopic = copy.filter((el) => el.topic.includes(searchTopic.current.value));
		setPosts(selectedTopic);

		if ((e.key === 'Enter' && searchWhat.current.value === '') || (e.key === 'Enter' && searchWhat.current.value === '제목')) {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.title.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (e.key === 'Enter' && searchWhat.current.value === '내용') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.content.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (e.key === 'Enter' && searchWhat.current.value === '작성자') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.userId.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
	};

	const searchArticleClick = () => {
		let copy = [...Posts];
		const selectedTopic = copy.filter((el) => el.topic.includes(searchTopic.current.value));
		setPosts(selectedTopic);

		if (searchWhat.current.value === '' || searchWhat.current.value === '제목') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.title.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (searchWhat.current.value === '내용') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.content.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (searchWhat.current.value === '작성자') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.userId.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
	};

	return (
		<>
			<Helmet>
				<title>1:1문의</title>
			</Helmet>
			<LayoutNone type={''} name1={'community'}>
				<div className='titTop'>
					<h1>1:1문의</h1>
				</div>
				<div className='searchBarWrap'>
					<div className='searchBarTop'>
						<div className='dateInputContainer'>
							<input
								type='checkBox'
								name='nonDate'
								ref={ignoreDateRef}
								onClick={() => {
									setIgnoreCheck((IgnoreCheck) => !IgnoreCheck);
								}}
							/>
							<label htmlFor='nonDate'>날짜 미지정</label>
							<input type='date' className='dateInput' ref={startDateRef} disabled={IgnoreCheck ? true : false} />
							<span>-</span>
							<input type='date' className='dateInput' ref={endDateRef} disabled={IgnoreCheck ? true : false} />
						</div>

						<div className='dateBtnWrap'>
							<button
								ref={oneWeekBtn}
								onClick={() => {
									setActiveDateBtn(0);
									startDateRef.current.value = oneWeekAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 0 ? activeDateBtnStyle : null}
							>
								1주일
							</button>
							<button
								ref={oneMonthBtn}
								onClick={() => {
									setActiveDateBtn(1);
									startDateRef.current.value = oneMonthAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 1 ? activeDateBtnStyle : null}
							>
								1개월
							</button>
							<button
								ref={threeMonthBtn}
								onClick={() => {
									setActiveDateBtn(2);
									startDateRef.current.value = threeMonthsAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 2 ? activeDateBtnStyle : null}
							>
								3개월
							</button>
						</div>
					</div>
					<div className='searchBarBottom'>
						<div className='selectContainer'>
							<select className='searchTopic' ref={searchTopic}>
								<option value=''>분류 전체</option>
								<option value='문의'>문의</option>
								<option value='요청'>요청</option>
								<option value='전시'>전시</option>
								<option value='이벤트'>이벤트</option>
							</select>
							<select className='searchWhat' ref={searchWhat}>
								<option value=''>전체</option>
								<option value='제목'>제목</option>
								<option value='내용'>내용</option>
								<option value='작성자'>작성자</option>
							</select>
						</div>

						<input type='text' ref={searchInput} placeholder='검색어를 입력하세요' className='searchBar' onKeyDown={(e) => handleSubmitKeyDown(e)} />
						<FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmitClick} />
					</div>
				</div>
				<div className='btnContainer'>
					{user.uid !== '' && (
						<button className='writeBtn' onClick={() => history.push('/faq/write')}>
							글쓰기
						</button>
					)}

					{user.uid === '' && (
						<button className='seeCommunityList' onClick={() => history.push('/Login')}>
							로그인
						</button>
					)}

					<div className='rightBtnWrap'>
						<p>{/* 전체 <span>{Posts.length}</span>건 */}</p>
						<select
							className='arrayBtn'
							onClick={(e) => {
								if (e.target.value === '오름차순') {
									const copyPosts = [...Posts];
									const ascArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title));
									setPosts(ascArr);
								} else if (e.target.value === '내림차순') {
									const copyPosts = [...Posts];
									const descArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title)).reverse();
									setPosts(descArr);
								} else if (e.target.value === '최신순') {
									const copyPosts = [...Posts];
									const ascDate = copyPosts.sort((a, b) => a.date.localeCompare(b.date)).reverse();
									setPosts(ascDate);
								}
							}}
						>
							<option value=''>정렬하기</option>
							<option value='오름차순'>오름차순</option>
							<option value='내림차순'>내림차순</option>
							<option value='최신순'>최신순</option>
						</select>{' '}
						&nbsp;
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='18'
							viewBox='0 0 20 18'
							onClick={() => {
								setIsListType(false);
							}}
							style={{ fill: IsListType === false ? '#17809b' : '#171717' }}
						>
							<path
								id='align_card'
								d='M22-11v7a.966.966,0,0,1-.29.71A.966.966,0,0,1,21-3H13v-8ZM11-11v8H3a.966.966,0,0,1-.71-.29A.966.966,0,0,1,2-4v-7Zm0-10v8H2v-7a.966.966,0,0,1,.29-.71A.966.966,0,0,1,3-21Zm10,0a.966.966,0,0,1,.71.29A.966.966,0,0,1,22-20v7H13v-8Z'
								transform='translate(-2 21)'
							></path>
						</svg>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='18'
							viewBox='0 0 20 18'
							onClick={() => {
								setIsListType(true);
							}}
							style={{ fill: IsListType === true ? '#17809b' : '#171717' }}
						>
							<path
								id='align_row'
								d='M22-11v7a.966.966,0,0,1-.29.71A.966.966,0,0,1,21-3H13v-8Zm-9,0v8H3a.966.966,0,0,1-.71-.29A.966.966,0,0,1,2-4v-7Zm0-10v8H2v-7a.966.966,0,0,1,.29-.71A.966.966,0,0,1,3-21Zm8,0a.966.966,0,0,1,.71.29A.966.966,0,0,1,22-20v7H13v-8Z'
								transform='translate(-2 21)'
							></path>
						</svg>
					</div>
				</div>
				<div className='horzienLine' />
				<div className={IsListType === false ? 'listWrap roomy' : 'listWrap'}>
					{ShowArticleLists ? (
						Posts &&
						currentPosts.map((post, idx) => {
							return (
								<div className='list' key={post._id}>
									<h3>{post.topic}</h3>
									<h2>
										{post.isSecret === true ? <FontAwesomeIcon icon={faLock} /> : ''}{' '}
										{(user.displayName === 'administrator' || user.displayName === post.writer.displayName) && post.isSecret ? (
											<Link to={`/faq/detail/${post.communityNum}`}>{!IsListType && post.title.length > 18 ? `${post.title.substr(0, 15)}...` : post.title}</Link>
										) : (
											<span
												onClick={() => {
													if ((user.displayName !== 'administrator' || user.displayName !== post.writer.displayName || user.displayName === '') && post.isSecret === true) {
														alert('본인이 등록한 게시글만 조회하실 수 있습니다.');
													} else if (post.isSecret === false) {
														// 페이지 이동을 위해 useHistory 훅을 사용
														history.push(`/faq/detail/${post.communityNum}`);
													}
												}}
											>
												{!IsListType && post.title.length > 18 ? `${post.title.substr(0, 15)}...` : post.title}
											</span>
										)}
									</h2>
									<div className='bottomWrap'>
										<p>{`${post.publishedDate}`.substr(0, 10)}</p>
										<p>{`${post.writer.displayName}`.substr(0, 3).replace(/^(.)(.*)$/, '$1**')}</p>
										<p>
											<FontAwesomeIcon icon={faCommentDots} />
											{post.comments ? post.comments.length : 0}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<p className='notFoundErr'>{NotFoundErr && NotFoundErr}</p>
					)}
				</div>
				<div className='horzienLine2' />
				<Pagination activePage={Currentpage} itemsCountPerPage={8} totalItemsCount={30} pageRangeDisplayed={3} prevPageText={'‹'} nextPageText={'›'} onChange={pageChange} />;
			</LayoutNone>
		</>
	);
}

export default FaqRead;
