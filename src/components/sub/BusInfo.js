function BusInfo({ localBusIcon, localBusKo, localBus, trunkBusIcon, trunkBusKo, trunkBus, expressBusIcon, expressBusKo, expressBus, seaterBusKo, seaterBus, seaterBusIcon }) {
	return (
		<div className='busInfoWrap'>
			<div className='busTitWrap'>
				<ul>
					<li>
						{localBusIcon}
						{localBusKo} {localBus}
					</li>
					<li>
						{trunkBusIcon}
						{trunkBusKo} {trunkBus}
					</li>
					<li>
						{expressBusIcon}
						{expressBusKo} {expressBus}
					</li>
					<li>
						{seaterBusIcon}
						{seaterBusKo} {seaterBus}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default BusInfo;
