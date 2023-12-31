//인수에 전달 된 값을 payload에 담아서 액션객체를 반환하는 함수 export
//해당 액션생성함수는 추후 컴포넌트에서 호출될 예정

export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

export const setMuseum = (data) => {
	return {
		type: 'SET_MUSEUM',
		payload: data,
	};
};

export const setPromotion = (data) => {
	return {
		type: 'SET_PROMOTION',
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

export const setLoginUser = (data) => {
	return {
		type: 'SET_LOGIN_USER',
		payload: data,
	};
};

export const setLogoutUser = () => {
	return {
		type: 'SET_LOGOUT_USER',
	};
};
