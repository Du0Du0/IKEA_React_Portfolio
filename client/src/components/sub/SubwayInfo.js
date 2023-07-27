import { useState } from 'react';

function SubwayInfo({ subwayIcon, subwayStationName, subwayStationDec }) {
	return (
		<div className='subwayInfoWrap'>
			<div className='subwayTitWrap'>
				<span>{subwayIcon}</span> <h3>{subwayStationName}</h3>
			</div>
			<div className='subwayTitDesc'>
				<p>{subwayStationDec} </p>
			</div>
		</div>
	);
}

export default SubwayInfo;
