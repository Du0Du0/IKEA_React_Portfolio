function BusInfo({ localBusIcon, localBusKo, localBus, trunkBusIcon, trunkBusKo, trunkBus, expressBusIcon, expressBusKo, expressBus, seaterBusKo, seaterBus, seaterBusIcon }) {
	return (
		<div className='busInfoWrap'>
			<div className='busTitWrap'>
				<ul>
					{/* 지선버스 */}
					<li style={{ display: localBus === '' && 'none' }}>
						<span>{localBusIcon}</span>
						<h3>
							<strong> {localBusKo}</strong>
						</h3>
						<p>{localBus}</p>
					</li>
					{/* 간선버스 */}
					<li style={{ display: trunkBus === '' && 'none' }}>
						<span>{trunkBusIcon}</span>
						<h3>
							<strong> {trunkBusKo} </strong>
						</h3>
						<p> {trunkBus}</p>
					</li>
					{/* 광역버스 */}
					<li style={{ display: expressBus === '' && 'none' }}>
						<span>{expressBusIcon}</span>
						<h3>
							<strong> {expressBusKo} </strong>
						</h3>
						<p> {expressBus}</p>
					</li>
					{/* 좌석버스 */}
					<li style={{ display: seaterBus === '' && 'none' }}>
						<span> {seaterBusIcon}</span>
						<h3>
							<strong>{seaterBusKo} </strong>
						</h3>
						<p> {seaterBus}</p>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default BusInfo;
