import LayoutNone from '../../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Helmet } from 'react-helmet-async';
import firebase from '../../../firebase';
import { setLoginUser, setLogoutUser } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useDebounce } from '../../../hooks/useDebounce';

function Department() {
	const [IsOpen, setIsOpen] = useState(false);
	const [AddressValue, setAddressValue] = useState('');
	const [ExtraAddress, setExtraAddress] = useState('');
	const [ZoneCode, setZoneCode] = useState('');
	const [InputCount, setInputCount] = useState(0);
	const [InputType1, setInputType1] = useState('password');
	const [InputType2, setInputType2] = useState('password');
	const history = useHistory();
	const [IsDisabled, setIsDisabled] = useState(false);
	const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
	const selectEmailAddress = useRef(null);
	const hobby = useRef(null);
	const introduce = useRef(null);
	const city = useRef(null);
	const isMail = useRef(null);
	const isSMS = useRef(null);
	const isKakao = useRef(null);
	const initVal = useRef({
		userid: '',
		nickname: '',
		password: '',
		passwordCheck: '',
		emailId: '',
		emailAddress: '',
		emailAddressSelect: '',
		job: '',
		introduce: '',
		hobby: [],
		zoneCode: '',
		address: '',
		detailAddress: '',
		extraAddress: '',
		mail: '',
		sms: '',
		kakao: '',
	});

	const [Val, setVal] = useState(initVal.current);
	const [Submit, setSubmit] = useState(false);
	const [Err, setErr] = useState({});
	const dispatch = useDispatch();
	const DebouncedVal = useDebounce(Val);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const showErr = useCallback(() => {
		console.log('showErr');
		setErr(check(DebouncedVal));
	}, [DebouncedVal]);

	const handleCheck = (e) => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스를 반복돌면서 하나라도 체크되어 있는게 있으면 true값 반환
		let checkArr = [];
		inputs.forEach((el) => {
			if (el.checked) checkArr.push(el.value);
		});
		setVal({ ...Val, [name]: checkArr });
	};

	const handleRadio = (e) => {
		const { name, value } = e.target;

		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('현재 스테이트값', Val);

		const errors = check(Val);
		setErr(errors);

		const isValid = Object.keys(errors).length === 0;
		if (isValid) {
			try {
				const email = Val.emailId + '@' + (Val.emailAddress === '' ? Val.emailAddressSelect : Val.emailAddress);
				const password = Val.password;

				const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

				// displayName 추가가 완료된 후에 리덕스 스테이트를 업데이트합니다.
				await createdUser.user.updateProfile({
					displayName: Val.userid,
				});

				const item = {
					displayName: createdUser.user.multiFactor.user.displayName,
					uid: createdUser.user.multiFactor.user.uid,
				};

				// 리덕스 스테이트를 업데이트합니다.
				dispatch(
					setLoginUser({
						displayName: Val.userid,
						uid: createdUser.user.uid,
					})
				);

				axios.post('/api/join', item).then((res) => {
					if (res.data.success) {
						firebase.auth().signOut();
						alert('성공적으로 회원가입 되었습니다.');
						history.push('/login');
					} else return alert('회원가입에 실패했습니다.');
				});
			} catch (error) {
				console.error('회원가입 오류:', error.message);
			}
		}
	};

	const check = (value) => {
		const errs = {};

		// user id : 영문(소문자만가능), 숫자를 포함한 6~12자 조합
		const idRegex = /^[a-z0-9]{6,12}$/;

		//nickname : 한글,영문(대소문자가능), 숫자,공백을 포함한 1~12자 조합으로 입력해주세요.
		const nickRegex = /^[a-zA-Zㄱ-힣0-9\s]{1,12}$/;

		//password : 영문(대문자 1개이상 필수),숫자,특수문자(~!@#$%^&*)를 포함한 10~20자 조합으로 입력해 주세요.
		const passWordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,20}$/;

		if (!idRegex.test(value.userid)) {
			errs.userid = '영문(소문자만가능), 숫자를 포함한 6~12자 조합으로 입력하세요.';
		}
		if (!nickRegex.test(value.nickname)) {
			errs.nickname = '한글,영문(대소문자가능), 숫자,공백을 포함한 1~12자 조합으로 입력해주세요.';
		}
		if (!passWordRegex.test(value.password)) {
			errs.password = '영문(대문자필수),숫자,특수문자(~!@#$%^&*)를 포함한 10~20자 조합으로 입력해 주세요.';
		}
		if (value.password !== value.passwordCheck || !value.passwordCheck) {
			errs.passwordCheck = '두 개의 비밀번호를 동일하게 입력하세요.';
		}
		if (!value.emailId) {
			errs.email = '올바른 이메일 형식을 입력하세요.';
		}
		if (!value.zoneCode || !value.detailAddress || value.detailAddress.length < 6) {
			errs.address = '올바른 우편번호와 주소를 입력해주세요.';
		}
		return errs;
	};

	const resetForm = useCallback(() => {
		setVal(initVal);
	}, []);

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
		}
	}, [Err, Submit, resetForm]);

	useEffect(() => {
		showErr();
	}, [DebouncedVal, showErr]);

	//"비밀번호" 문자 보이기/숨기기 토글 기능
	const passwordToggle = () => {
		setInputType1((InputType1) => !InputType1);
	};
	//"비밀번호 확인" 문자 보이기/숨기기 토글 기능
	const passwordCheckToggle = () => {
		setInputType2((InputType2) => !InputType2);
	};

	//다음 우편 api 검색된 우편번호/주소/동 불러오는 함수
	const handleComplete = async (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

		setVal((prevVal) => ({ ...prevVal, zoneCode: data.zonecode }));
		setVal((prevVal) => ({ ...prevVal, address: data.address }));
		setVal((prevVal) => ({ ...prevVal, extraAddress: data.bname }));
	};

	/*
	다음 우편번호 팝업창 열기 기능
	다음 우편번호 팝업창 style prop 설정 (스타일 및 화면 중앙 위치)
	*/
	const handleClick = () => {
		var width = 500;
		var height = 600;
		open({
			onComplete: handleComplete,
			theme: themeObj,
			popupTitle: '우편번호 검색 팝업',
			popupKey: 'popup1',
			width: width,
			height: height,
			left: window.screen.width / 2 - width / 2,
			top: window.screen.height / 2 - height / 2,
		});
	};
	const themeObj = {
		searchBgColor: '#1B2539',
		queryTextColor: '#FFFFFF',
	};

	return (
		<>
			<Helmet>
				<title>회원가입</title>
			</Helmet>
			<LayoutNone type={''} name1={'department'}>
				{/* 회원가입 페이지 제목 */}
				<div className='titTop'>
					<h1>회원가입</h1>
				</div>
				<div className='titContainer'>
					{/* 상단 회원가입 순서도 */}
					<div className='timeLine'>
						{/* 01. 약관동의 */}
						<div className='timeLineNum'>
							<h2>
								01
								<br />
								약관동의
							</h2>
						</div>

						{/* 02. 정보입력 */}
						<div className='timeLineNum'>
							<h2>
								02
								<br />
								정보입력
							</h2>
						</div>

						{/* 03. 가입완료 */}
						<div className='timeLineNum'>
							<h2>
								03
								<br />
								가입완료
							</h2>
						</div>
					</div>
				</div>

				{/* Info1. 필수정보입력 */}
				<div className='info1'>
					<h2>필수정보입력</h2>
					<form method='get' id='signUp'>
						<fieldset>
							<legend className='h'>회원가입 폼 필수정보 항목</legend>
							<table border='0'>
								<tbody>
									{/* user id */}
									<tr>
										<th scope='row'>
											<label htmlFor='userid'>아이디</label>
										</th>
										<td>
											<input type='text' name='userid' id='userid' onChange={handleChange} value={Val.userid} autoFocus={true} />

											<p className='idErr' style={{ color: Err.userid ? '#d80000' : 'initial' }}>
												{Err.userid ? <span>{Err.userid}</span> : '영문(소문자만가능), 숫자를 포함한 6~12자 조합으로 입력하세요.'}
											</p>
										</td>
									</tr>

									{/* nick name */}
									<tr>
										<th scope='row'>
											<label htmlFor='nickname'>닉네임</label>
										</th>
										<td>
											<input type='text' name='nickname' id='nickname' onChange={handleChange} value={Val.nickname} />

											<p className='nickErr' style={{ color: Err.nickname ? '#d80000' : 'initial' }}>
												{Err.nickname ? <span>{Err.nickname}</span> : '	한글,영문(대소문자가능), 숫자,공백을 포함한 1~12자 조합으로 입력해주세요.'}
											</p>
										</td>
									</tr>

									{/* password */}
									<tr>
										<th>
											<label htmlFor='password'>비밀번호</label>
										</th>
										<td>
											<input type={InputType1 ? 'password' : 'text'} name='password' id='password' placeholder='새 비밀번호' autoComplete={'off'} onChange={handleChange} value={Val.password} />
											<FontAwesomeIcon icon={faEye} onClick={passwordToggle} style={InputType1 ? { color: '#969696' } : { color: '#1b2539' }} />
											<br />

											<PasswordStrengthBar className='pwdStrength' password={Val.password} shortScoreWord={false} scoreWords={false} />
											<p className='emailErr' style={{ color: Err.password ? '#d80000' : 'initial' }}>
												{Err.password ? <span>{Err.password}</span> : '영문(대문자필수),숫자,특수문자(~!@#$%^&*)를 포함한 10~20자 조합으로 입력해 주세요.'}
											</p>
										</td>
									</tr>

									{/* password check */}
									<tr>
										<th>
											<label htmlFor='passwordCheck'>비밀번호 확인</label>
										</th>
										<td>
											<input
												type={InputType2 ? 'password' : 'text'}
												name='passwordCheck'
												id='passwordCheck'
												placeholder='변경할 비밀번호 확인'
												autoComplete={'off'}
												onChange={handleChange}
												value={Val.passwordCheck}
											/>
											<FontAwesomeIcon icon={faEye} onClick={passwordCheckToggle} style={InputType2 ? { color: '#969696' } : { color: '#1b2539' }} />
											<br />
											<p className='pwdErr2' style={{ color: Err.passwordCheck ? '#d80000' : 'initial' }}>
												{Err.passwordCheck ? <span>{Err.passwordCheck}</span> : '비밀번호 확인을 위해 다시 한번 입력해 주세요.'}
											</p>
										</td>
									</tr>

									{/* email */}
									<tr>
										<th>
											<label htmlFor='email'>이메일</label>
											<label htmlFor='emailAddress' className='h'>
												이메일주소
											</label>
											<label htmlFor='emailAddressSelect' className='h'>
												이메일주소선택
											</label>
										</th>
										<td>
											{/* email id */}
											<input type='email' name='emailId' id='emailId' onChange={handleSelect} value={Val.emailId} />
											&nbsp;<span>@</span>&nbsp;
											{/* email address */}
											<input
												type='email'
												name='emailAddress'
												id='emailAddress'
												onChange={handleChange}
												value={Val.emailAddressSelect === '' ? Val.emailAddress : Val.emailAddressSelect}
												disabled={Val.emailAddressSelect === '' ? false : true}
												style={Val.emailAddressSelect === '' ? { background: '#fff' } : { background: '#f4f5f6' }}
											/>
											{/* email select button */}
											<select name='emailAddressSelect' id='emailAddressSelect' onChange={handleSelect} value={Val.emailAddressSelect} ref={selectEmailAddress}>
												<option value=''>직접입력</option>
												<option value='naver.com'>naver.com</option>
												<option value='google.com'>google.com</option>
												<option value='yahoo.co.kr'>yahoo.co.kr</option>
												<option value='freechai.com'>freechai.com</option>
												<option value='empal.com'>empal.com</option>
												<option value='intizen.com'>intizen.com</option>
												<option value='hanmir.com'>hanmir.com</option>
												<option value='paran.com'>paran.com</option>
												<option value='hotmail.com'>hotmail.com</option>
												<option value='hanmail.net'>hanmail.net</option>
												<option value='nate.com'>nate.com</option>
											</select>
											<br />
											<p className='emailErr' style={{ color: Err.email ? '#d80000' : 'initial' }}>
												{Err.email ? <span>{Err.email}</span> : '이메일을 입력해주세요.'}
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				{/* Info2. 선택정보입력 */}
				<div className='info2'>
					<h2>선택정보입력</h2>
					<form action='result.html' method='get' id='signUp2'>
						<fieldset>
							<legend className='h'>회원가입 폼 선택정보 항목 </legend>
							<table border='0'>
								<tbody>
									{/* job */}
									<tr>
										<th scope='row'>
											<label htmlFor='job'>직업</label>
										</th>
										<td>
											<input type='text' name='job' id='job' onChange={handleChange} value={Val.job} />
										</td>
									</tr>

									{/* introduce */}
									<tr>
										<th scope='row'>
											<label htmlFor='introduce'>프로필 소개</label>
										</th>
										<td>
											<textarea
												name='introduce'
												id='introduce'
												placeholder='프로필 소개를 입력해주세요.'
												cols='30'
												rows='6'
												className='introducehtmlForm'
												maxLength={200}
												value={Val.introduce}
												onChange={handleChange}
												ref={introduce}
											></textarea>
											<br />
											<span className='textareaCount'>
												<span>{introduce.current !== null ? introduce.current.value.length : 0}</span>/200
											</span>
										</td>
									</tr>

									{/* hobby */}
									<tr>
										<th scope='row'>취미</th>
										<td ref={hobby}>
											<input type='checkbox' name='hobby' id='game' value='게임' onChange={handleCheck} />
											<label htmlFor='game'>게임</label>

											<input type='checkbox' name='hobby' id='song' value='노래' onChange={handleCheck} />
											<label htmlFor='song'>노래</label>

											<input type='checkbox' name='hobby' id='hiking' value='등산' onChange={handleCheck} />
											<label htmlFor='hiking'>등산</label>

											<input type='checkbox' name='hobby' id='reading' value='읽기' onChange={handleCheck} />
											<label htmlFor='reading'>읽기</label>

											<input type='checkbox' name='hobby' id='etc' value='기타' onChange={handleCheck} />
											<label htmlFor='etc'>기타</label>
										</td>
									</tr>

									{/* domain */}
									<tr>
										<th scope='row'>
											<label htmlFor='domain'>홈페이지</label>
										</th>
										<td>
											<input type='text' name='domain' id='domain' placeholder='홈페이지가 있는 경우 링크를 입력해주세요. 예)www.myhome.co.kr' onChange={handleChange} value={Val.domain} />
										</td>
									</tr>

									{/* city */}
									<tr>
										<th scope='row'>
											<label htmlFor='city'>지역</label>
										</th>
										<td>
											<select name='city' id='city' onChange={handleSelect} ref={city}>
												<option value='서울'>서울</option>
												<option value='경기'>경기</option>
												<option value='광주'>광주</option>
												<option value='대구'>대구</option>
												<option value='대전'>대전</option>
												<option value='세종'>세종</option>
												<option value='부산'>부산</option>
												<option value='울산'>울산</option>
												<option value='인천'>인천</option>
												<option value='강원'>강원</option>
												<option value='경남'>경남</option>
												<option value='경북'>경북</option>
												<option value='전남'>전남</option>
												<option value='전북'>전북</option>
												<option value='충북'>충북</option>
												<option value='충남'>충남</option>
												<option value='제주'>제주</option>
											</select>
										</td>
									</tr>

									{/* post zonecode / address */}
									<tr>
										<th scope='row'>
											<label htmlFor='sample6_postcode' className='h'>
												우편번호
											</label>
											<label htmlFor='sample6_address' className='addressTit'>
												주소
											</label>
											<label htmlFor='sample6_detailAddress' className='h'>
												상세주소
											</label>
											<label htmlFor='sample6_extraAddress' className='h'>
												참고항목
											</label>
										</th>
										<td>
											{/* post code */}
											<input type='text' name='zoneCode' id='sample6_postcode' placeholder='우편번호' className='address' readOnly={true} value={Val.zoneCode} onChange={handleChange} />

											{/* post code popup open button */}
											<input type='button' id='sample6_execDaumPostcode' value='우편번호 찾기' className='addressBtn' onClick={handleClick} />
											<br />

											{/* address */}
											<input type='text' name='address' id='sample6_address' placeholder='주소' className='address' readOnly={true} value={Val.address} onChange={handleChange} />
											<br />

											{/* detail address */}
											<input type='text' name='detailAddress' id='sample6_detailAddress' placeholder='상세주소' className='address' value={Val.detailAddress} onChange={handleChange} />

											{/* extra address */}
											<input type='text' name='extraAddress' id='sample6_extraAddress' placeholder='참고항목' className='address' readOnly={true} value={Val.extraAddress} onChange={handleChange} />
											<br />
											<p className='addressErr' style={{ color: Err.address ? '#d80000' : 'initial' }}>
												{Err.address ? <span>{Err.address}</span> : '우편번호와 주소를 입력해주세요.'}
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				{/* Info3. 정보수신 동의 */}
				<div className='info3'>
					<h2>정보수신 동의</h2>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼 정보수신동의 항목</legend>
							<table border='0'>
								<tbody>
									<tr>
										<th scope='row'>메일수신</th>
										<td ref={isMail}>
											<input type='radio' name='mail' id='agree1Y' value='Y' onChange={handleRadio} />
											<label htmlFor='agree1Y'>받겠습니다.</label>

											<input type='radio' name='mail' id='agree1N' value='N' onChange={handleRadio} />
											<label htmlFor='agree1N'>받지않겠습니다.</label>
										</td>
									</tr>

									<tr>
										<th scope='row'>SMS 수신</th>
										<td ref={isSMS}>
											<input type='radio' name='sms' id='agree2Y' value='Y' onChange={handleRadio} />
											<label htmlFor='agree2Y'>받겠습니다.</label>

											<input type='radio' name='sms' id='agree2N' value='N' onChange={handleRadio} />
											<label htmlFor='agree2N'>받지않겠습니다.</label>
										</td>
									</tr>
									{/* kakao */}
									<tr>
										<th scope='row'>알림톡 수신</th>
										<td ref={isKakao}>
											<input type='radio' name='kakao' id='agree3Y' value='Y' onChange={handleRadio} />
											<label htmlFor='agree3Y'>받겠습니다.</label>

											<input type='radio' name='kakao' id='agree3N' value='N' onChange={handleRadio} />
											<label htmlFor='agree3N'>받지않겠습니다.</label>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				{/* 하단 취소버튼, 제출버튼 */}
				<div className='btnSet'>
					<input type='reset' value='취소' className='resetBtn' onClick={() => setVal(initVal)} />
					<input type='submit' value='제출' onClick={handleSubmit} />
				</div>
			</LayoutNone>
		</>
	);
}

export default Department;
