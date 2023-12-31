import LayoutNone from '../../common/LayoutNone';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

function Write() {
	const history = useHistory();
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [Posts, setPosts] = useState(getLocalData());
	const userId = useRef(null);
	const topic = useRef(null);
	const title = useRef(null);
	const keyword = useRef(null);
	const content = useRef(null);
	const comments = useRef(null);
	const password = useRef(null);

	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');

	//작성글 초기화
	const resetForm = () => {
		userId.current.value = '';
		topic.current.value = '';
		title.current.value = '';
		keyword.current.value = '';
		content.current.value = '';
		comments.current.value = '';
		password.current.value = '';
	};

	useEffect(() => {}, []);

	//게시물 생성
	const creatPost = async () => {
		const newPosts = {
			userId: userId.current.value,
			password: password.current.value,
			topic: topic.current.value,
			title: title.current.value,
			keyword: [keyword.current.value],
			content: content.current.value,
			date: new Date(),
			comments: [],
		};

		const updatedData = [newPosts, ...Posts];
		setPosts(updatedData);

		localStorage.setItem('post', JSON.stringify(updatedData));

		history.push({
			pathname: '/community/articles',
			state: {
				Posts: updatedData,
			},
		});
	};

	console.log(Posts);
	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<>
			<Helmet>
				<title>글쓰기</title>
			</Helmet>
			<LayoutNone type={''} name1={'write'}>
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
								<input type='text' ref={userId} />
							</td>
						</tr>

						<tr>
							{/* 비밀번호 */}
							<th scope='row'>
								<label htmlFor='userId'>
									글 비밀번호
									<br />
									(숫자)
								</label>
							</th>
							<td>
								<input type='password' ref={password} className='pwdInput' />
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
								<input type='text' placeholder='제목을 입력하세요.' ref={title} value={Tit} onChange={(e) => setTit(e.target.value)} />
							</td>
						</tr>

						<tr>
							{/* 키워드 */}
							<th>
								<label htmlFor='keyword'>키워드</label>
							</th>
							<td>
								<input type='text' placeholder='키워드를 ,로 구분해서 작성해 주세요.' ref={keyword} />
							</td>
						</tr>

						<tr>
							{/* 내용 */}
							<th>
								<label htmlFor='content'>내용</label>
							</th>
							<td>
								<textarea placeholder='내용을 작성해주세요.' ref={content} value={Con} onChange={(e) => setCon(e.target.value)} />
							</td>
						</tr>
					</tbody>
				</table>

				<div className='submitBtnWrap'>
					<button type='cancel' onClick={() => history.goBack()}>
						취소
					</button>
					<button type='submit' onClick={creatPost}>
						등록
					</button>
				</div>
			</LayoutNone>
		</>
	);
}

export default Write;
