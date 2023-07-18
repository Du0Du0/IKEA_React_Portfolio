import LayoutNone from '../common/LayoutNone';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Community from './Community';

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

	//작성글 초기화
	const resetForm = () => {
		userId.current.value = '';
		topic.current.value = '';
		title.current.value = '';
		keyword.current.value = '';
		content.current.value = '';
	};

	//게시물 생성
	const creatPost = async () => {
		const newPosts = {
			userId: userId.current.value,
			topic: topic.current.value,
			title: title.current.value,
			keyword: keyword.current.value,
			content: content.current.value,
			date: new Date(),
		};

		const updatedData = [newPosts, ...Posts];
		setPosts(updatedData);

		localStorage.setItem('post', JSON.stringify(updatedData));

		history.push({
			pathName: '/community',
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
			<LayoutNone type={''} name1={'write'}>
				<div className='titTop'>
					<h1>1:1문의</h1>
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
								<input type='text' placeholder='제목을 입력하세요.' ref={title} />
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

						<tr className='contentWrap'>
							{/* 내용 */}
							<th>
								<label htmlFor='content'>내용</label>
							</th>
							<td>
								<textarea placeholder='내용을 작성해주세요.' ref={content} />
							</td>
						</tr>
					</tbody>
				</table>

				<div className='horzienLine' />
				<div className='submitBtnWrap'>
					<button type='submit' onClick={() => history.goBack()}>
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
