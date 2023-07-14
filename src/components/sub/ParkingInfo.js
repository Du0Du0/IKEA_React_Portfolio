function ParkingInfo() {
	return (
		<div className='parkingInfoWrap'>
			<div className='parkingTime'>
				<h3>무료주차 이용안내</h3>

				<ul>
					<li>1만원 이상 구매 : 1시간</li>
					<li>2만원 이상 구매 : 2시간</li>
					<li>3만원 이상 구매 : 3시간</li>
					<li>5만원 이상 구매 : 4시간</li>
					<li>10만원 이상 구매 : 5시간</li>
				</ul>
			</div>

			<div className='parkingCost'>
				<h3>주차요금</h3>

				<ul>
					<li>10분당 : 1,000원 (30분 내 회차 시 무료)</li>
				</ul>

				<ul>
					<li>구매 영수증 미지참 시 주차요금이 부과됩니다.</li>
					<li>전자 영수증으로도 확인이 가능합니다.</li>
					<li>식당가(7F) 이용고객 무료주차 2시간(금액 무관) </li>
					<li>백화점 출차 시 타매장은 인정되지 않습니다. </li>
				</ul>
			</div>
		</div>
	);
}

export default ParkingInfo;
