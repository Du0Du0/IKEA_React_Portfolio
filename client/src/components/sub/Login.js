import LayoutNone from '../common/LayoutNone';
import styled from 'styled-components';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebase from '../../firebase';

function Login() {
	const path = process.env.PUBLIC_URL;
	const history = useHistory();

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
		height: 650px;
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

	const PasswordInput = styled.input`
		width: 460px;
		height: 49px;
		padding: 11px 12px;
		border-radius: 5px;
		border: 1px solid #cfcfcf;
		outline: none;
		margin-bottom: 20px;

		&::placeholder {
			font: 16px/1 'Pretendard';
			color: #090909;
		}

		&:focus {
			outline: 1px solid #12a8ce;
		}
	`;

	const HorizenLine = styled.div`
		width: 460px;
		height: 1px;
		background: #cfcfcf;
		margin: 20px auto 30px;
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

	const CategoryListAfter = styled.span`
		font: 16px/1 'Pretendard';
		color: #ddd;
		margin-right: 5px;
		margin-left: 5px;
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

	const SocialLoginBtn = styled.button`
		width: 68px;
		height: 68px;
		border-radius: 50%;
		border: none;

		img {
			height: 70px;
			cursor: pointer;
		}
	`;

	const SocialLoginBtnWrap = styled.div`
		display: flex;
		gap: 50px;
	`;

	const NaverWrap = styled.div`
		display: flex;
		gap: 20px;
		align-items: center;
	`;

	const SocialLoginDesc = styled.p`
		font: bold 18px/1.2 'Pretendard';
		color: #090909;
	`;

	const KakaoWrap = styled.div`
		display: flex;
		gap: 20px;
		align-items: center;
	`;

	const [Email, setEmail] = useState('');
	const [Pwd, setPwd] = useState('');
	const [Err, setErr] = useState('');

	const handleLogin = async () => {
		if (!(Email && Pwd)) return alert('모든 값을 입력하세요.');

		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
			history.push('/');
		} catch (err) {
			console.log(err.code);
			if (err.code === 'auth/user-not-found') setErr('존재하지 않는 이메일입니다.');
			else if (err.code === 'auth/wrong-password') setErr('비밀번호 정보가 일치하지 않습니다.');
			else setErr('로그인에 실패했습니다.');
		}
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<>
			<LayoutNone type={''} name1={'login'}>
				<LoginContainer>
					<LoginWrap>
						<TitleWrap>
							<Title>ID로그인</Title>
						</TitleWrap>
						<FormWrap>
							<UserIdInput type='email' placeholder='이메일' autoFocus={true} value={Email} onChange={(e) => setEmail(e.target.value)} />
							<PasswordInput type='password' placeholder='비밀번호' value={Pwd} onChange={(e) => setPwd(e.target.value)} />
						</FormWrap>
						{Err !== '' && <ErrCode>{Err}</ErrCode>}
						<HorizenLine />
						<LoginBtnWrap>
							<LoginBtn onClick={handleLogin}>로그인</LoginBtn>
						</LoginBtnWrap>

						<LoginCategoryContainer>
							<CategoryLists>
								<NavLink to='#'>
									<CategoryList>비밀번호 찾기</CategoryList>
								</NavLink>
								<CategoryListAfter>|</CategoryListAfter>
								<NavLink to='/department'>
									<CategoryList>회원가입</CategoryList>
								</NavLink>
							</CategoryLists>
						</LoginCategoryContainer>

						<SnsLoginContainer>
							<SnsLoginTitle>SNS 간편로그인</SnsLoginTitle>
							<SocialLoginBtnWrap>
								<NaverWrap>
									<SocialLoginBtn>
										<img src={`${path + '/img/naverLogin.png'}`} alt='naver login button' />
									</SocialLoginBtn>
									<SocialLoginDesc>
										네이버 <br />
										로그인
									</SocialLoginDesc>
								</NaverWrap>
								<KakaoWrap>
									<SocialLoginBtn>
										<img src={`${path + '/img/kakaoLogin.png'}`} alt='kakao login button' />
									</SocialLoginBtn>
									<SocialLoginDesc>
										카카오
										<br /> 로그인
									</SocialLoginDesc>
								</KakaoWrap>
							</SocialLoginBtnWrap>
						</SnsLoginContainer>
					</LoginWrap>
				</LoginContainer>
			</LayoutNone>
		</>
	);
}

export default Login;
