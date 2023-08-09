import LayoutNone from '../../common/LayoutNone';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function FaqUpdate() {
	const history = useHistory();
	const location = useLocation();
	const params = useParams();

	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');
	const [Detail, setDetail] = useState({});
	const [Topic, setTopic] = useState('');
	const [Keyword, setKeyword] = useState([]);

	const handleUpdate = () => {
		if (Title.trim() === '' || Content.trim() === '') return alert('모든 항목을 입력하세요.');

		const item = {
			// topic: Topic,
			title: Title,
			content: Content,
			// keyword: Keyword,
			id: params.id,
		};
		axios.post('/api/faq/update', item).then((res) => {
			if (res.data.success) {
				alert('글 수정이 완료되었습니다.');
				history.push('/faq');
			} else {
				alert('글 수정에 실패했습니다.');
			}
		});
	};

	useEffect(() => {
		axios.post('/api/faq/detail', params).then((res) => {
			if (res.data.success) {
				console.log(res.data.detail);
				setDetail(res.data.detail);
			}
		});
	}, []);

	useEffect(() => {
		//서버쪽으로 새로운 응답이 넘어오자마자
		console.log(Detail);
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

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
								<input type='text' readOnly className='userIdInput' />
							</td>
						</tr>

						<tr>
							{/* 분류 */}
							<th>
								<label htmlFor='topic'>분류</label>
							</th>
							<td>
								<select value={Topic || ''} onChange={(e) => e.target.value}>
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
								<input type='text' value={Title || ''} onChange={(e) => setTitle(e.target.value)} className='titleInput' />
							</td>
						</tr>

						<tr>
							{/* 키워드 */}
							<th>
								<label htmlFor='keyword'>키워드</label>
							</th>
							<td>
								<input type='text' placeholder='키워드를 ,로 구분해서 작성해 주세요.' value={Keyword} onChange={(e) => e.target.value} className='keywordInput' />
							</td>
						</tr>

						<tr className='contentWrap'>
							{/* 내용 */}
							<th>
								<label htmlFor='content'>내용</label>
							</th>
							<td>
								<textarea placeholder='내용을 작성해주세요.' value={Content} onChange={(e) => e.target.value} />
							</td>
						</tr>
					</tbody>
				</table>
				<div className='horzienLine' />
				<div className='submitBtnWrap'>
					<button type='submit' onClick={() => history.goBack()}>
						취소
					</button>
					<button type='submit' onClick={handleUpdate}>
						수정하기
					</button>
				</div>
			</LayoutNone>
		</>
	);
}

export default FaqUpdate;
