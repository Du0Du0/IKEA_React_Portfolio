import LayoutNone from '../common/LayoutNone';
import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { firebaseInstance, authService } from '../../firebase';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

function Login() {
	const path = process.env.PUBLIC_URL;
	const [UserData, setUserData] = useState(null);

	const LoginContainer = styled.div`
		width: 100vw;
		height: 100vh;
		padding: 96px 10vw 96px;
		display: flex;
		justify-content: center;
		align-items: center;
	`;

	const LoginWrap = styled.div`
		width: 576px;
		height: 780px;
		background: #f4f5f8;
		border-radius: 10px;
	`;

	const TitleWrap = styled.div`
		width: 100%;
		height: 33px;
		display: flex;
		justify-content: center;
		padding: 30px;
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
		width: 500px;
		height: 49px;
		padding: 11px 12px;
		border-radius: 5px;
		margin-bottom: 15px;
		border: 1px solid #cfcfcf;

		&::placeholder {
			font: 16px/1 'Pretendard';
			color: #090909;
		}
	`;

	const PasswordInput = styled.input`
		width: 500px;
		height: 49px;
		padding: 11px 12px;
		border-radius: 5px;
		border: 1px solid #cfcfcf;

		&::placeholder {
			font: 16px/1 'Pretendard';
			color: #090909;
		}
	`;

	const HorizenLine = styled.div`
		width: 500px;
		height: 1px;
		background: #cfcfcf;
		margin: 30px auto 30px;
	`;

	const LoginBtnWrap = styled.div`
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	`;

	const LoginBtn = styled.button`
		width: 500px;
		height: 70px;
		border-radius: 10px;
		background: linear-gradient(to left, #e34891, #1877f2);
		font: bold 20px/1 'Pretendard';
		color: #fff;
		border: none;
		cursor: pointer;
	`;

	const LoginCategoryContainer = styled.div`
		width: 100%;
		height: auto;
		padding: 20px 5vw 50px;
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

		&:nth-of-type(1) {
			&::after {
				content: '|';
				margin-right: 10px;
				margin-left: 10px;
				color: #ddd;
			}
		}
	`;

	const SnsLoginContainer = styled.div`
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`;

	const SnsLoginTitle = styled.h3`
		font: bold 28px/1 'Pretendard';
		color: #090909;
		margin-bottom: 40px;
	`;

	const GoolgLoginBtn = styled.button`
		width: 382px;
		height: 92px;
		background: none;
		border: none;

		img {
			height: 70px;
			cursor: pointer;
		}
	`;

	const goToGoogleLogin = () => {
		const provider = new GoogleAuthProvider(); // provider를 구글로 설정
		signInWithPopup(auth, provider) // popup을 이용한 signup
			.then((data) => {
				setUserData(data.user); // user data 설정
				console.log(data); // console로 들어온 데이터 표시
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<LayoutNone type={''} name1={'login'}>
				<LoginContainer>
					<LoginWrap>
						<TitleWrap>
							<Title>ID로그인</Title>
						</TitleWrap>
						<FormWrap>
							<UserIdInput placeholder='아이디' />
							<PasswordInput placeholder='비밀번호' />
						</FormWrap>
						<HorizenLine />
						<LoginBtnWrap>
							<LoginBtn>로그인</LoginBtn>
						</LoginBtnWrap>

						<LoginCategoryContainer>
							<CategoryLists>
								<CategoryList>비밀번호 찾기</CategoryList>
								<CategoryList>회원가입</CategoryList>
							</CategoryLists>
						</LoginCategoryContainer>

						<SnsLoginContainer>
							<SnsLoginTitle>SNS 간편로그인</SnsLoginTitle>
							<ul>
								<li>네이버 로그인</li>
								<li>카카오 로그인</li>
								<li>
									<GoolgLoginBtn>
										<img src={path + '/img/googleLoginBtn.png'} alt='google login' onClick={goToGoogleLogin} />
									</GoolgLoginBtn>
								</li>
								<li>페이스북</li>
							</ul>
						</SnsLoginContainer>
					</LoginWrap>
				</LoginContainer>
			</LayoutNone>
		</>
	);
}

export default Login;
