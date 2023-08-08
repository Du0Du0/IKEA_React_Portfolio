import LayoutNone from '../../common/LayoutNone';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function FindPassword() {
	const auth = getAuth();
	const [Email, setEmail] = useState('');
	const [Err, setErr] = useState('');

	return (
		<>
			<LayoutNone type={''} name1={'login'}>
				<LoginContainer>
					<LoginWrap>
						<TitleWrap>
							<Title>비밀번호찾기</Title>
						</TitleWrap>
						<FormWrap>
							<UserIdInput type='email' placeholder='이메일 입력' value={Email} onChange={(e) => setEmail(e.target.value)} />
						</FormWrap>
						{Err !== '' && <ErrCode>{Err}</ErrCode>}
						<LoginBtnWrap>
							<LoginBtn
								onClick={() => {
									sendPasswordResetEmail(auth, Email)
										.then((a) => {
											setErr('이메일을 확인해 주세요!');
										})
										.catch((err) => {
											console.log('err', err);
											setErr('등록되지 않은 이메일입니다.');
										});
								}}
							>
								이메일 전송
							</LoginBtn>
						</LoginBtnWrap>

						<LoginCategoryContainer>
							<CategoryLists>
								<NavLink to='/login'>
									<CategoryList>로그인화면으로 돌아가기</CategoryList>
								</NavLink>
							</CategoryLists>
						</LoginCategoryContainer>
					</LoginWrap>
				</LoginContainer>
			</LayoutNone>
		</>
	);
}

const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 96px 10vw 96px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoginWrap = styled.div`
	width: 530px;
	height: 380px;
	background: #f4f5f8;
	border-radius: 10px;
`;

const TitleWrap = styled.div`
	width: 100%;
	height: 33px;
	display: flex;
	justify-content: center;
	padding: 30px;
	margin-top: 20px;
	margin-bottom: 40px;
`;

const Title = styled.h2`
	font: bold 28px/1 'Pretendard';
	color: #090909;
`;

const FormWrap = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const UserIdInput = styled.input`
	width: 460px;
	height: 49px;
	padding: 11px 12px;
	border-radius: 5px;
	margin-bottom: 15px;
	border: 1px solid #cfcfcf;
	outline: none;

	&::placeholder {
		font: 16px/1 'Pretendard';
		color: #090909;
	}

	&:focus {
		outline: 1px solid #12a8ce;
	}
`;

const LoginBtnWrap = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
`;

const LoginBtn = styled.button`
	width: 460px;
	height: 70px;
	border-radius: 10px;
	background: linear-gradient(to left, #e34891, #1877f2);
	font: 20px/1 'Pretendard';
	color: #fff;
	border: none;
	cursor: pointer;

	&:hover {
		background: linear-gradient(to left, #1877f2, #e34891);
	}
`;

const ErrCode = styled.p`
	font: 14px/1 'Pretendard';
	color: #d80000;
	justify-content: left;
	align-items: left;
	margin-left: 35px;
	margin-bottom: 20px;
`;

const LoginCategoryContainer = styled.div`
	width: 100%;
	height: auto;
	padding: 20px 5vw 60px;
	display: flex;
	justify-content: center;
`;

const CategoryLists = styled.ul`
	display: flex;
	gap: 15px;
`;

const CategoryList = styled.li`
	font: 16px/1 'Pretendard';
	color: #555555;
	cursor: pointer;

	&:hover {
		color: #090909;
		text-decoration-line: underline;
		text-decoration-color: #090909;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		text-underline-position: under;
	}
`;

export default FindPassword;
