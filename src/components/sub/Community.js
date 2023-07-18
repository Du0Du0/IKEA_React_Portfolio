import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import LayoutNone from '../common/LayoutNone';
import { useHistory, useLocation } from 'react-router-dom';
import Write from './Write';
import Detail from './Detail';

function Community() {
	const history = useHistory();
	const location = useLocation();

	const dummy = [
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
		{ userId: '안녕', topic: '전시', title: '하이용', keyword: '안녕,오늘', content: 'ㅇㅅㅇ하이용' },
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};
	const [Posts, setPosts] = useState(getLocalData());
	console.log('Postsㄴㄴ', Posts);
	const [See, setSee] = useState([0, 0, 0, 0, 0, 0]);

	const goToDetail = (idx) => {
		let seeCopy = [...See];
		seeCopy[idx] = seeCopy[idx] + 1;
		setSee(seeCopy);

		history.push({
			pathname: '/detail',
			state: {
				Posts: [...Posts],
				idx: idx,
			},
		});
		console.log(Posts);
		console.log(idx);
	};

	return (
		<LayoutNone type={''} name1={'community'}>
			<div className='titTop'>
				<h1>커뮤니티</h1>
			</div>
			<div className='searchBarWrap'>
				<div className='searchBarTop'>
					<input type='checkBox' name='nonDate' />
					<label htmlFor='nonDate'>날짜 미지정</label>

					<input type='date' className='dateInput' />
					<span>-</span>
					<input type='date' className='dateInput' />

					<div className='dateBtnWrap'>
						<button>1주일</button>
						<button>1개월</button>
						<button>3개월</button>
					</div>
				</div>
				<div className='searchBarBottom'>
					<select className='searchTopic'>
						<option value=''>분류 전체</option>
						<option vlaue='문의'>문의</option>
						<option vlaue='요청'>요청</option>
						<option vlaue='전시'>전시</option>
						<option vlaue='이벤트'>이벤트</option>
					</select>
					<select className='searchWhat'>
						<option value=''>전체</option>
						<option value='제목'>제목</option>
						<option value='내용'>내용</option>
						<option value='작성자'>작성자</option>
					</select>
					<input
						type='text'
						placeholder='검색어를 입력하세요'
						className='searchBar' // 입력시킨 검색 단어와 일치하는 값 찾아주는 기능
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								const searchWord = e.target.value;
								console.log('searchWord', searchWord);
								let copy = [...Posts];
								const newFilter = copy.filter((el) => el.title.includes(searchWord));
								console.log('newFilter', newFilter);
								setPosts(newFilter);
							} else return;
						}}
					/>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</div>
			</div>
			<div className='btnContainer'>
				<button className='writeBtn' onClick={() => history.push('/Write')}>
					글쓰기
				</button>

				<div className='rightBtnWrap'>
					<p>
						전체 <span>{Posts.length}</span>건
					</p>
					<select
						className='arrayBtn'
						onClick={(e) => {
							if (e.target.value === '오름차순') {
								console.log('오름차순');
								const copyPosts = [...Posts];
								const ascArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title));
								console.log('오름차순정렬');
								setPosts(ascArr);
							} else if (e.target.value === '내림차순') {
								console.log('내림차순');
								const copyPosts = [...Posts];
								const descArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title)).reverse();
								console.log('내림차순정렬');
								setPosts(descArr);
							} else if (e.target.value === '최신순') {
								console.log('최신순');
								const copyPosts = [...Posts];
								const ascDate = copyPosts.sort((a, b) => a.date.localeCompare(b.date)).reverse();
								console.log('최신순정렬');
								setPosts(ascDate);
							}
						}}
					>
						<option value=''>정렬하기</option>
						<option value='오름차순'>오름차순</option>
						<option value='내림차순'>내림차순</option>
						<option value='최신순'>최신순</option>
					</select>
				</div>
			</div>
			<div className='horzienLine' />
			<div className='listWrap'>
				{Posts &&
					Posts.map((post, idx) => {
						return (
							<div
								className='list'
								key={idx}
								onClick={() => {
									goToDetail(idx);
								}}
							>
								<h3>{post.topic}</h3>
								<h2>{`${post.title}`.length > 18 ? `${post.title}`.substr(0, 18) + '...' : `${post.title}`}</h2>
								<div className='bottomWrap'>
									<p>{`${post.date}`.substr(0, 10)}</p>
									<p>{`${post.userId}`.substr(0, 3).replace(/^(.)(.*)$/, '$1**')}</p>
								</div>
							</div>
						);
					})}
			</div>
			<div className='horzienLine2' />
		</LayoutNone>
	);
}

export default Community;
