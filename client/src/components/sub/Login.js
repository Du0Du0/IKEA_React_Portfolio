import LayoutNone from '../common/LayoutNone';

function Login() {
	return (
		<>
			<LayoutNone type={''} name1={'login'}>
				<div className='loginContainer'>
					<div className='title'>
						<h2>ID로그인</h2>
					</div>
					<div className='formContainer'>
						<input type='text' placeholder='아이디' />
						<input type='password' placeholder='비밀번호' />
					</div>
					-------
					<input type='submit' value='로그인' />
					<div className='loginCategoryContainer'>
						<ul>
							<li>비밀번호 찾기</li>
							<li>회원가입</li>
						</ul>
					</div>
					<div className='snsLoginContainer'>
						<h3>SNS간편로그인</h3>
						<ul>
							<li>네이버 로그인</li>
							<li>카카오 로그인</li>
							<li>구글 로그인</li>
							<li>페이스북</li>
						</ul>
					</div>
				</div>
			</LayoutNone>
		</>
	);
}

export default Login;
