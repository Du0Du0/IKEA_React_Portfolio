import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import LayoutNone from '../common/LayoutNone';
import { useHistory, useLocation } from 'react-router-dom';

function Community() {
	const history = useHistory();

	const dummy = [
		{
			userId: 'ikeastyle',
			topic: '전시',
			title: '이케아 한국, 다가오는 전시와 이벤트 소식',
			keyword: ['이케아, 전시, 이벤트, 소식'],
			content:
				'이케아 한국에서 여러분을 위해 다가오는 전시와 이벤트 소식을 알려드립니다! 현대적이고 세련된 디자인의 가구와 소품들로 가득 찬 이케아 전시를 만나보세요. 또한, 특별한 이벤트와 할인 행사들로 여러분을 찾아뵙기를 기다리고 있습니다. 이케아와 함께하는 특별한 시간을 놓치지 마세요!',
			date: '2023-06-21T03:36:57.998Z',
		},
		{
			userId: '인사이더',
			topic: '문의',
			title: '많이 하는 제품 문의',
			keyword: ['인사이더, 제품 문의'],
			content:
				'이케아 인사이더에게 궁금한 제품들에 대한 문의를 남겨보세요! 제품의 상세 정보와 사용 방법에 대해 도움을 드리고, 인테리어에 관한 유용한 정보도 제공해드립니다. 이케아 제품을 더욱 잘 활용하는 팁과 노하우를 전해드리며, 집 안에서의 즐거움을 더욱 높여보세요.',
			date: '2023-05-21T03:36:57.998Z',
		},
		{
			userId: ' ikeahomeevent',
			topic: '이벤트',
			title: '이케아 홈 이벤트, 특별한 추억 만들기',
			keyword: ['이케아, 홈 이벤트, 추억, 특별한 경험'],
			content:
				'이케아 홈 이벤트에서 특별한 추억을 만들어보세요! 다양한 가구와 소품들로 인테리어를 꾸미고, 집 안에서의 따뜻한 시간을 보낼 수 있습니다. 이벤트 기간 동안 특별한 할인 혜택과 이케아만의 특별한 경험들이 여러분을 기다리고 있습니다. 특별한 날을 함께 채워보세요!',
			date: '2023-04-21T03:36:57.998Z',
		},
		{
			userId: 'ikeafun',
			topic: '이벤트',
			title: '이케아 펀, 다양한 이벤트로 놀라운 경험',
			keyword: ['이케아, 펀, 다양한 이벤트, 경험'],
			content:
				'이케아 펀에서 다양한 이벤트와 놀라운 경험을 만나보세요! 신제품 런칭 이벤트, 특별한 워크샵, 가구 조립 대회 등 다채로운 행사들이 여러분을 기다리고 있습니다. 이케아의 창의적이고 즐거운 이벤트로 재미있는 시간을 보내고, 더 많은 이케아의 매력을 발견해보세요.',
			date: '2023-03-21T03:36:57.998Z',
		},
		{
			userId: '이케아서포트팀',
			topic: '요청',
			title: '이케아 지원센터, 도움이 필요한 모든 순간',
			keyword: ['지원센터, 도움, 모멘트'],
			content:
				'이케아 지원센터에서는 여러분이 도움이 필요한 모든 순간을 지원합니다. 제품 사용법, 조립 방법, 인테리어 팁, 유용한 정보 등 여러분이 원하는 모든 것을 이곳에서 찾아보세요. 이케아의 전문가들이 여러분을 위한 유용한 정보와 노하우를 제공합니다. 함께 만드는 더 나은 공간을 위해 이케아 지원센터와 함께하세요.',
			date: '2023-02-21T03:36:57.998Z',
		},
		{
			userId: 'ikeavoice',
			topic: '요청',
			title: '이케아 의견 요청, 여러분의 목소리를 들려주세요',
			keyword: ['이케아, 의견 요청, 목소리'],
			content:
				'이케아는 여러분의 목소리를 소중히 여깁니다. 제품 개선을 위해 여러분의 소중한 의견을 기다립니다. 제품 사용 중 불편한 점이나 개선사항, 원하는 제품 라인업 등 여러분의 아이디어를 이케아에게 전달해주세요. 여러분의 목소리로 더 나은 이케아를 만들어가겠습니다.',
			date: '2023-01-21T03:36:57.998Z',
		},
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};
	const [Posts, setPosts] = useState(getLocalData());

	const goToDetail = (idx) => {
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

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

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
								let copy = [...Posts];
								const newFilter = copy.filter((el) => el.title.includes(searchWord));
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
