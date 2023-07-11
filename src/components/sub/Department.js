import LayoutNone from '../common/LayoutNone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import DaumPostcode from './DaumPostcode';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState, useRef } from 'react';

function Department() {
	const [IsOpen, setIsOpen] = useState(false);
	const [AddressValue, setAddressValue] = useState('');
	const [ExtraAddress, setExtraAddress] = useState('');
	const [ZoneCode, setZoneCode] = useState('');
	const introduce = useRef(null);
	const [InputCount, setInputCount] = useState(0);

	const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

	const handleComplete = (data) => {
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

		setAddressValue(data.address);
		setExtraAddress(data.bname);
		setZoneCode(data.zonecode);
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};
	return (
		<>
			<LayoutNone type={''} name1={'department'}>
				<div className='titTop'>
					<h1>회원가입</h1>
				</div>
				<div className='titContainer'>
					<div className='timeLine'>
						<div className='timeLineNum'>
							<h2>
								01
								<br />
								약관동의
							</h2>
						</div>

						<div className='timeLineNum'>
							<h2>
								02
								<br />
								정보입력
							</h2>
						</div>

						<div className='timeLineNum'>
							<h2>
								03
								<br />
								가입완료
							</h2>
						</div>
					</div>
				</div>

				<div className='info1'>
					<h2>필수정보입력</h2>
					<form action='result.html' method='get' id='signUp'>
						<fieldset>
							<legend className='h'>회원가입 폼 필수정보 항목</legend>
							<table border='0'>
								<tbody>
									<tr>
										<th scope='row'>
											<label htmlFor='userid'>아이디</label>
										</th>
										<td>
											<input type='text' name='userid' id='userid' autofocus />

											<p className='idErr'>영문(소문자만가능), 숫자를 포함한 6~12자 조합으로 입력해주세요.</p>
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='nickname'>닉네임</label>
										</th>
										<td>
											<input type='text' name='nickname' id='nickname' />

											<p className='nickErr'>한글,영문(대소문자가능), 숫자,공백을 포함한 1~12자 조합으로 입력해주세요.</p>
										</td>
									</tr>

									<tr>
										<th>
											<label htmlFor='password'>비밀번호</label>
										</th>
										<td>
											<input type='password' name='password' id='password' placeholder='새 비밀번호' autocomplete='off' />
											<FontAwesomeIcon icon={faEye} />
											<br />

											<progress max='4' value='0' id='meter'></progress>
											<p className='pwdErr'>영문,숫자,특수문자(~!@#$%^&*)를 포함한 10~20자 조합으로 입력해 주세요.</p>
										</td>
									</tr>

									<tr>
										<th>
											<label htmlFor='passwordCheck'>비밀번호 확인</label>
										</th>
										<td>
											<input type='password' name='passwordCheck' id='passwordCheck' placeholder='변경할 비밀번호 확인' />
											<FontAwesomeIcon icon={faEye} />
											<br />
											<p className='pwdErr2'>비밀번호 확인을 위해 다시 한번 입력해 주세요.</p>
										</td>
									</tr>

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
											<input type='email' name='email' id='email' />
											&nbsp;<span>@</span>&nbsp;
											<input type='email' name='emailAddress' id='emailAddress' />
											<select name='emailAddressSelect' id='emailAddressSelect'>
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
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				<div className='info2'>
					<h2>선택정보입력</h2>
					<form action='result.html' method='get' id='signUp2'>
						<fieldset>
							<legend className='h'>회원가입 폼 선택정보 항목 </legend>
							<table border='0'>
								<tbody>
									<tr>
										<th scope='row'>
											<label htmlFor='job'>직업</label>
										</th>
										<td>
											<input type='text' name='job' id='job' />
										</td>
									</tr>

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
												ref={introduce}
												onChange={(e) => {
													if (e.target.value.length > e.target.maxLength) {
														e.target.value = e.target.value.slice(0, e.target.maxLength);
													}
													setInputCount(e.target.value.length);
												}}
												onInput={(e) => {
													if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength);
												}}
											></textarea>
											<br />
											<span className='textareaCount'>
												(<span>{InputCount}</span>/200)
											</span>
										</td>
									</tr>

									<tr>
										<th scope='row'>취미</th>
										<td>
											<input type='checkbox' name='hobby' id='game' value='게임' />
											<label htmlFor='game'>게임</label>

											<input type='checkbox' name='hobby' id='song' value='노래' />
											<label htmlFor='song'>노래</label>

											<input type='checkbox' name='hobby' id='hiking' value='등산' />
											<label htmlFor='hiking'>등산</label>

											<input type='checkbox' name='hobby' id='reading' value='읽기' />
											<label htmlFor='reading'>읽기</label>

											<input type='checkbox' name='hobby' id='etc' value='기타' />
											<label htmlFor='etc'>기타</label>
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='domain'>홈페이지</label>
										</th>
										<td>
											<input type='text' name='domain' id='domain' placeholder='홈페이지가 있는 경우 링크를 입력해주세요. 예)www.myhome.co.kr' />
										</td>
									</tr>

									<tr>
										<th scope='row'>
											<label htmlFor='city'>지역</label>
										</th>
										<td>
											<select name='city' id='city'>
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
											<input type='text' name='postcode' id='sample6_postcode' placeholder='우편번호' className='address' readonly value={ZoneCode} />
											<input type='button' onclick='sample6_execDaumPostcode()' value='우편번호 찾기' className='addressBtn' onClick={handleClick} />
											<br />

											<input type='text' name='address' id='sample6_address' placeholder='주소' className='address' value={AddressValue} />
											<br />
											<input type='text' name='detailAddress' id='sample6_detailAddress' placeholder='상세주소' className='address' />
											<input type='text' name='extraAddress' id='sample6_extraAddress' placeholder='참고항목' className='address' value={ExtraAddress} />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				<div className='info3'>
					<h2>정보수신 동의</h2>
					<form action='result.html' method='get' id='signUp3'>
						<fieldset>
							<legend className='h'>회원가입 폼 정보수신동의 항목</legend>
							<table border='0'>
								<tbody>
									<tr>
										<th scope='row'>메일수신</th>
										<td>
											<input type='radio' name='mail' id='agree1Y' value='Y' />
											<label htmlFor='agree1Y'>받겠습니다.</label>

											<input type='radio' name='mail' id='agree1N' value='N' />
											<label htmlFor='agree1N'>받지않겠습니다.</label>
										</td>
									</tr>

									<tr>
										<th scope='row'>SMS 수신</th>
										<td>
											<input type='radio' name='sms' id='agree2Y' value='Y' />
											<label htmlFor='agree2Y'>받겠습니다.</label>

											<input type='radio' name='sms' id='agree2N' value='N' />
											<label htmlFor='agree2N'>받지않겠습니다.</label>
										</td>
									</tr>
									{/* kakao */}
									<tr>
										<th scope='row'>알림톡 수신</th>
										<td>
											<input type='radio' name='kakao' id='agree3Y' value='Y' />
											<label htmlFor='agree3Y'>받겠습니다.</label>

											<input type='radio' name='kakao' id='agree3N' value='N' />
											<label htmlFor='agree3N'>받지않겠습니다.</label>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>

				<div className='btnSet'>
					<input type='reset' value='취소' className='resetBtn' />
					<input type='submit' value='제출' />
				</div>
			</LayoutNone>
		</>
	);
}

export default Department;
