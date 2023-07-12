import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function StoreName() {
	const [City, setCity] = useState('');
	const [Weather, setWeather] = useState('');
	const [Icon, setIcon] = useState('');
	const [Temp, setTemp] = useState(0);
	const [value, onChange] = useState(new Date());

	// const fetchWeather = async () => {
	// 	const cityName = 'Seoul';
	// 	const apiKey = '92f6760901be4aa4456b1e38b5d060c6';
	// 	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

	// 	const result = await axios.get(url);

	// 	console.log(result);
	// 	setCity(result.data.name);
	// 	setWeather(result.data.weather[0].main);
	// 	setIcon(result.data.weather[0].icon);
	// 	setTemp(result.data.main.feels_like);
	// };
	// useEffect(() => fetchWeather(), []);

	//휴점
	const holidayMarks = ['11-07-2023'];

	//연장영업
	const openLongMarks = [
		'01-07-2023',
		'02-07-2023',
		'07-07-2023',
		'08-07-2023',
		'09-07-2023',
		'14-07-2023',
		'15-07-2023',
		'15-07-2023',
		'16-07-2023',
		'22-07-2023',
		'23-07-2023',
		'28-07-2023',
		'29-07-2023',
		'30-07-2023',
	];

	return (
		<div className='topPopUp'>
			{/* 상단 안내 소개 배너*/}
			<div className='upperBanner'>
				<p>김도현님, 이케아 홈페이지에 오신걸 환영합니다.</p>
			</div>
			{/* 상단 매장지점 정보란 / 스케쥴 / 달력 표시 */}

			<div className='storeListContainer'>
				<div className='leftContainer'>
					<div className='storeNameWrap'>
						<h2>{City}</h2>
						<select
							name='storeName'
							id='storeName'
							onChange={(e) => {
								setCity(e.target.value);
							}}
						>
							점포 변경
							<option value=''>점포 변경</option>
							<option value='Seoul'>서울</option>
							{/* <option value='기흥'>기흥</option>
							<option value='광명'>광명</option> */}
							<option value='Busan'>동부산</option>
						</select>
					</div>
					<div className='weatherWrap'>
						{Weather}
						{Icon}
						{Temp}
					</div>
					<div className='selectStoreDesc'>
						<p>
							오늘은 10:30부터 20:00까지
							<br /> 정상 영업합니다.
						</p>
					</div>
				</div>

				<div className='middleContainer'>
					<ul>
						<li>휴점</li>
						<li>연장영업</li>
						<li>오늘</li>
						<li>1</li>
						<li>1</li>
						<li>1</li>
						<li>1</li>
					</ul>
					<button>쇼핑 정보 바로가기</button>
				</div>

				<div className='rightContainer'>
					<Calendar
						onChange={onChange}
						value={value}
						locale='en-EN'
						formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
						selectRange={false}
						next2Label={null}
						prev2Label={null}
						showNeighboringMonth={false}
						tileClassName={({ date, view }) => {
							if (holidayMarks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
								return 'highlight';
							}
							if (openLongMarks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
								return 'openLong';
							}
						}}
					/>
					<div className='dateDesc'>
						<ul>
							<li>휴점</li>
							<li>연장영업</li>
							<li>오늘</li>
						</ul>
					</div>
				</div>
			</div>

			{/* 하단 요약 배너 */}
			<div className='descBanner'>
				<p>HOME / 점포안내 / 고양 / 한눈에 보기</p>
			</div>
		</div>
	);
}

export default StoreName;
