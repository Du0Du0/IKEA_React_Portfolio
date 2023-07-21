//인수에 전달 된 값을 payload에 담아서 액션객체를 반환하는 함수 export
//해당 액션생성함수는 추후 컴포넌트에서 호출될 예정

export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

export const setSubYoutube = (data) => {
	return {
		type: 'SET_SUBYOUTUBE',
		payload: data,
	};
};

export const setMainYoutube = (data) => {
	return {
		type: 'SET_MAINYOUTUBE',
		payload: data,
	};
};
