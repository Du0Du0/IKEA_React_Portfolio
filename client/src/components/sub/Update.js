import LayoutNone from '../common/LayoutNone';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Community from './Community';
import Detail from './Detail';
import { Helmet } from 'react-helmet-async';

function Update() {
	const history = useHistory();
	const location = useLocation();
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
	};
	const [Posts, setPosts] = useState([]);

	const userId = useRef(null);
	const topic = useRef(null);
	const title = useRef(null);
	const keyword = useRef(null);
	const content = useRef(null);

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
				history.push('/detail');
			}
		} else {
			console.log('idx', idx);
			const selectedPost = posts && posts[idx];

			setPosts(selectedPost);
			// 처음 페이지 들어올 때 idx 값을 localStorage에 저장
			localStorage.setItem('idx', idx);
		}
	}, []);

	//게시물 수정
	const UpdatePost = async (idx) => {
		const changePosts = {
			userId: userId.current.value,
			topic: topic.current.value,
			title: title.current.value,
			keyword: [keyword.current.value],
			content: content.current.value,
			date: new Date(),
		};

		const data = localStorage.getItem('post');
		const posts = JSON.parse(data);

		console.log('posts', posts);
		const updatedPosts = posts.map((post, i) => {
			const storedIdx = JSON.parse(localStorage.getItem('idx'));
			console.log('storedIdx', storedIdx);
			if (i === storedIdx) {
				console.log('이거');
				return changePosts;
			} else if (i !== storedIdx) console.log('아니');
			return post;
		});

		console.log('updatedPosts 최종:', updatedPosts);
		setPosts(updatedPosts);
		console.log('Posts 최종:', Posts);

		localStorage.setItem('post', JSON.stringify(updatedPosts)); //객체이기 때문에 문자열로 바꾸고 추가

		history.push({
			pathname: `/community/articles/${idx}`,
			state: {
				Posts: updatedPosts,
			},
		});
	};

	return (
		<>
			<Helmet>
				<title>글 수정</title>
			</Helmet>
			<LayoutNone type={''} name1={'update'}>
				<div className='titTop'>
					<h1>커뮤니티</h1>
				</div>
				<table>
					<tbody>
						<tr>
							{/* 작성자 */}
							<th scope='row'>
								<label htmlFor='userId'>작성자</label>
							</th>
							<td>
								<input type='text' ref={userId} defaultValue={Posts && Posts.userId} readOnly className='userIdInput' />
							</td>
						</tr>

						<tr>
							{/* 분류 */}
							<th>
								<label htmlFor='topic'>분류</label>
							</th>
							<td>
								<select ref={topic}>
									<option value=''>분류 전체</option>
									<option value='문의'>문의</option>
									<option value='요청'>요청</option>
									<option value='전시'>전시</option>
									<option value='이벤트'>이벤트</option>
								</select>
							</td>
						</tr>

						<tr>
							{/* 제목 */}
							<th>
								<label htmlFor='title'>제목</label>
							</th>
							<td>
								<input type='text' placeholder='제목을 입력하세요.' ref={title} defaultValue={Posts && Posts.title} className='titleInput' />
							</td>
						</tr>

						<tr>
							{/* 키워드 */}
							<th>
								<label htmlFor='keyword'>키워드</label>
							</th>
							<td>
								<input type='text' placeholder='키워드를 ,로 구분해서 작성해 주세요.' ref={keyword} defaultValue={Posts && Posts.keyword} className='keywordInput' />
							</td>
						</tr>

						<tr className='contentWrap'>
							{/* 내용 */}
							<th>
								<label htmlFor='content'>내용</label>
							</th>
							<td>
								<textarea placeholder='내용을 작성해주세요.' ref={content} defaultValue={Posts && Posts.content} />
							</td>
						</tr>
					</tbody>
				</table>
				<div className='horzienLine' />
				<div className='submitBtnWrap'>
					<button type='submit' onClick={() => history.goBack()}>
						취소
					</button>
					<button type='submit' onClick={UpdatePost}>
						수정하기
					</button>
				</div>
			</LayoutNone>
		</>
	);
}

export default Update;
