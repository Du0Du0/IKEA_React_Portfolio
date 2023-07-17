// function CommentModal({ NoticeModal, setNoticeModal }) {
import { useImperativeHandle, useEffect, forwardRef, useState } from 'react';

function CommentModal(props, ref) {
	const [Open, setOpen] = useState(false);
	console.log('child');

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});

	useEffect(() => {
		setOpen(true);
	}, []);

	return (
		<aside id='commentModal' style={Open ? { display: 'none' } : { display: 'block' }}>
			<h1>댓글남기기 작성 가이드</h1>
			<ul>
				<li>타인에게 불쾌감을 주는 욕설, 비방 등은 삼가주시기 바랍니다.</li>
				<li>주제와 관련없거나 부적절한 홍보 내용은 삼가주시기 바랍니다.</li>
				<li>기타 운영 정책에 어긋나는 내용이 포함될 경우, 사전 고지없이 노출 제한될 수 있습니다.</li>
			</ul>
			<button
				onClick={(e) => {
					setOpen(true);
				}}
			>
				닫기
			</button>
		</aside>
	);
}

export default forwardRef(CommentModal);
