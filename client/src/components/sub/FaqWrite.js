import LayoutNone from '../common/LayoutNone';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

function FaqWrite() {
	const history = useHistory();
	const [Tit, setTit] = useState('');
	const [Con, setCon] = useState('');
	const [Topic, setTopic] = useState('');
	const [UserId, setUserId] = useState('');
	const [Keyword, setKeyword] = useState([]);

	//게시물 작성 (mongoDB)
	const handleCreate = () => {
		const item = { topic: Topic, title: Tit, content: Con, keyword: Keyword };
		axios
			.post('/api/create', item)
			.then((res) => {
				console.log(res);
				alert('글 저장에 성공했습니다.');
				history.push('/faq');
			})
			.catch((err) => {
				console.log(err);
				alert('글 저장에 실패했습니다.');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Helmet>
				<title>글쓰기</title>
			</Helmet>
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
								<input
									type='text'
									value={UserId}
									onChange={(e) => {
										setUserId(e.target.value);
									}}
								/>
							</td>
						</tr>

						<tr>
							{/* 분류 */}
							<th>
								<label htmlFor='topic'>분류</label>
							</th>
							<td>
								<select
									value={Topic}
									onChange={(e) => {
										setTopic(e.target.value);
									}}
								>
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
								<input type='text' placeholder='제목을 입력하세요.' value={Tit} onChange={(e) => setTit(e.target.value)} />
							</td>
						</tr>

						<tr>
							{/* 키워드 */}
							<th>
								<label htmlFor='keyword'>키워드</label>
							</th>
							<td>
								<input type='text' placeholder='키워드를 ,로 구분해서 작성해 주세요.' value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
							</td>
						</tr>

						<tr>
							{/* 내용 */}
							<th>
								<label htmlFor='content'>내용</label>
							</th>
							<td>
								<textarea placeholder='내용을 작성해주세요.' value={Con} onChange={(e) => setCon(e.target.value)} />
							</td>
						</tr>
					</tbody>
				</table>

				<div className='submitBtnWrap'>
					<button type='cancel' onClick={() => history.goBack()}>
						취소
					</button>
					<button type='submit' onClick={handleCreate}>
						등록
					</button>
				</div>
			</LayoutNone>
		</>
	);
}

export default FaqWrite;
