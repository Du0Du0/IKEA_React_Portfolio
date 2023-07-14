import { useState } from 'react';

function SubwayInfo({ subwayIcon, subwayStationName, subwayStationDec }) {
	return (
		<div className='subwayInfoWrap'>
			<div className='subwayTitWrap'>
				<h3>
					{subwayIcon}
					{subwayStationName}
				</h3>
			</div>
			<p>{subwayStationDec} </p>
		</div>
	);
}

export default SubwayInfo;
