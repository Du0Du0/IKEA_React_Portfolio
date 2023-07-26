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

const initMuseum = {
	museum: [
		{
			topic: 'IKEA Museum',
			title: 'MÄVINN',
			content:
				'Enjoy some virtually unknown and amazing stories about how IKEA was born, how it grew, and how it goes on expanding around the world. There are examples of innovations and insights, magnificent catastrophes, fantastic ideas and innovative designs. The exhibition also shows some of the very first furniture sold by IKEA.',
			date: '2023.06.10',
		},
		{
			topic: 'IKEA Museum',
			title: 'Hej Ingvar!',
			content:
				'In this exhibition, we ask some of the people who worked closely with Ingvar Kamprad to talk about him and the qualities that made him one of the greatest businessmen of all time. Stories, myths and anecdotes about the Småland drive, curiosity and creativity, and the ability to see opportunities where others saw problems.',
			date: '2023.06.01',
		},
		{
			topic: 'IKEA Museum',
			title: 'Our Roots',
			content:
				'In Our Roots, it becomes clear how thrifty Småland creativity, Swedish modernism and Småland entrepreneurialism formed the very embryo of IKEA. We look at what it was like to live in Småland and Sweden in the old days, and how the landscape made its own demands and shaped the people, their character and their actions. About a continuous striving to keep hunger and poverty at bay.',
			date: '2023.05.30',
		},
		{
			topic: 'IKEA Museum',
			title: 'Democratic Design',
			content:
				'The exhibition takes you on an interactive journey through the five dimensions of Democratic Design: form, function, quality, sustainability and low price. It is an opportunity to discover and explore design challenges in life at home, and get an insight into just how product development on the factory floor can make a difference. Young visitors can explore the SAGOSKATT children’s elements, and the curious can learn more about the design process at IKEA.',
			date: '2023.05.20',
		},
		{
			topic: 'IKEA Museum',
			title: 'Us & Our Planet',
			content:
				'Since the 1950s, IKEA has been visiting people’s homes with the aim of improving life at home for the many people. The exhibition and book entitled Us & Our Planet are based on home visits, focusing on the social and environmental challenges faced by society. You will get to know homes, workplaces and shared spaces from Mexico to Moscow, from Bali to Beirut, to inspire improvements in the way we live. The exhibition highlights the small things we can all do to make the world a little better.',
			date: '2023.05.10',
		},
		{
			topic: 'IKEA Museum',
			title: 'The Story of IKEA',
			content:
				'Enjoy some virtually unknown and amazing stories about how IKEA was born, how it grew, and how it goes on expanding around the world. There are examples of innovations and insights, magnificent catastrophes, fantastic ideas and innovative designs. The exhibition also shows some of the very first furniture sold by IKEA.',
			date: '2023.04.30',
		},
		{
			topic: 'IKEA Museum',
			title: 'Existence Maximum',
			content:
				'Living big in small spaces is not exactly new to us. Even back in 1995, IKEA had an exhibition in Älmhult called ‘Small Space Living’. Now the future is here, and the majority of the world’s population live in cities, where the need for smart solutions is at its maximum and spaces at their minimum. Existence Maximum includes 14 rooms with inspirational solutions for widely differing purposes – and the rooms also change character depending on need and activity. The visitor can literally see how square metres are turned into cubed metres.',
			date: '2023.04.10',
		},
	],
};

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

const museumReducer = (state = initMuseum, action) => {
	switch (action.type) {
		case 'SET_MUSEUM':
			return {
				...state,
				museum: action.payload,
			};
		default:
			return state;
	}
};

const subYoutubeReducer = (state = { subYoutube: [] }, action) => {
	switch (action.type) {
		case 'SET_SUBYOUTUBE':
			return {
				...state,
				subYoutube: action.payload,
			};
		default:
			return state;
	}
};

const mainYoutubeReducer = (state = { mainYoutube: [] }, action) => {
	switch (action.type) {
		case 'SET_MAINYOUTUBE':
			return {
				...state,
				mainYoutube: action.payload,
			};
		default:
			return state;
	}
};

//해당 변형자 함수가 반환하는 객체값을 하나의 객체로 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer, subYoutubeReducer, mainYoutubeReducer, museumReducer });
export default reducers;
