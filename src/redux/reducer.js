//store의 데이터를 변경해주는 변형자 함수
//dispatch로 전달받튼 action객체로만 store데이터 변경 가능
import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Karin Mobring',
			sub: 'First lady of IKEA design',
			description:
				'It was love at first sight when Ingvar Kamprad spotted a wooden chair by a designer named Karin Mobring in 1964. With an eye for materials and a talent for designing comfortable, quality furniture with wide appeal, Karin was about to become the first female IKEA designer.',
			pic: 'member5.png',
		},
		{
			name: 'Hagberg',
			sub: 'Dynamic design duo',
			description:
				"Meet Marianne and Knut – they've designed over 2100 products for IKEA; everything from toys to toothbrush holders to tables. As subjects of the successful retrospective exhibition Hagberg + Hagberg, we pay tribute to the siblings who just might be the world’s most prolific design duo.",
			pic: 'member6.png',
		},
		{
			name: 'OBEGRANSAD',
			sub: 'electronic music artists',
			description:
				'Home is the new studio! Created together with electronic music artists, Swedish House Mafia, this just-launched collection helps music makers and other creatives to find their state of flow, wherever they call home.',
			pic: 'member1.png',
		},
		{
			name: 'Miami',
			sub: 'Swedish House Mafia',
			description:
				'Apparently even the Swedish House Mafia – who provided the playlist to many of our pre-teen years – isn’t immune to the multidisciplinary urge of creatives living in this new age.',
			pic: 'member2.png',
		},
	],
};

//초기 데이터값을 state로 지정하고 추후 action객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는
//변형자 함수 생성

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBER':
			return {
				...state,
				member: action.payload,
			};
		default:
			return state;
	}
};

//해당 변형자 함수가 반환하는 객체값을 하나의 객체로 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
