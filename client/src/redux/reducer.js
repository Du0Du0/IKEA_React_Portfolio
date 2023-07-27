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

const initPromotion = {
	promotion: [
		{
			title: '최신 SYMFONISK 시리즈 WIFI 스피커',
			topic: '프로모션',
			content:
				'인기 있는 SYMFONISK 시리즈에 최신으로 추가된 새로운 이케아 바닥등과 WiFi 스피커를 소개합니다. 이 제품은 기존 SYMFONISK 제품들과 마찬가지로 디자인과 기능성을 결합하여 고객들의 생활을 더욱 편리하고 즐겁게 만들어 줄 것입니다.바닥등은 세련된 디자인에 특별한 대나무 쉐이드가 장식되어, 어떤 방에서도 포인트가 되어줄 것입니다.더불어, 이케아와 소노스의 협업으로 개발된 이 제품은 사용하기 쉽고 다양한 기능을 지원하여 고객들의 라이프스타일을 더욱 풍요롭게 만들어줄 것입니다. 이제 바닥등과 스피커를 함께 사용하면 고풍스러운 분위기와 훌륭한 음향을 동시에 즐길 수 있습니다.',
			date: '2023.07.26',
			user: '민영진',
			keyword: ['SYMFONISK', '스피커'],
		},
		{
			title: '스마트 플러그와 멀티 컬러 조명',
			topic: '프로모션',
			content:
				'이케아의 Smart Plug와 다양한 컬러의 Multi-Color 조명을 소개합니다. Smart Plug를 사용하여 조명을 원격으로 조절하고, 멀티컬러 조명을 선택하여 공간에 화려하고 다채로운 빛을 연출할 수 있습니다. 스마트폰 앱을 통해 손쉽게 조명을 조작하고, 분위기에 맞는 컬러로 공간을 더욱 특별하게 만들어보세요.',
			date: '2023.07.26',
			user: '이아라',
			keyword: ['SYMFONISK', '스피커'],
		},
		{
			title: '방수 스피커와 아웃 도어 조명',
			topic: '프로모션',
			content:
				' 이케아의 방수 스피커와 튼튼한 아웃 도어 조명을 소개합니다. 내구성 있는 Waterproof 스피커와 튼튼한 야외 조명은 정원이나 테라스에서도 즐거운 음악과 조명을 제공합니다. 내구성과 품질을 겸비한 이 제품으로 야외에서도 편안하고 즐거운 시간을 보낼 수 있습니다.',
			date: '2023.07.26',
			user: '박보영',
		},
		{
			title: 'Lash 휴대용 무선 스피커와 원형 조명',
			topic: '프로모션',
			content:
				'이케아의 Lash 휴대용 무선 스피커와 원형 디자인의 조명을 소개합니다. 이 휴대용 스피커와 현대적인 원형 조명이 결합된 제품은 실내 및 야외에서 즐거운 음향과 조명을 즐길 수 있습니다. 어느 곳에서나 멋진 음악과 조명으로 특별한 시간을 만들어보세요.',
			date: '2023.07.26',
			user: '이예람',
		},
		{
			title: 'Lodash 블루투스 스피커와 조명 컬렉션',
			topic: '프로모션',
			content:
				'이케아의 Lodash 블루투스 스피커와 조명 컬렉션을 소개합니다. 다양한 디자인과 스타일의 조명과 함께 Lodash  블루투스 스피커를 연결하여 음악을 감상할 수 있습니다. 이 제품은 각기 다른 컬렉션으로 구성되어 공간에 맞는 조명과 음향을 선택할 수 있어 더욱 다채로운 홈 오디오와 조명 경험을 즐길 수 있습니다. Lodash  블루투스 스피커와 조명 컬렉션으로 특별한 공간을 완성해보세요.',
			date: '2023.07.26',
			user: '최진솔',
		},
		{
			title: 'Zax 캠핑용 휴대용 가스 버너와 무선 조명',
			topic: '프로모션',
			content:
				'Zax사의 블루투스 스피커와 조명 컬렉션을 소개합니다. 다양한 디자인과 스타일의 조명과 함께 Zax  블루투스 스피커를 연결하여 음악을 감상할 수 있습니다. 이 제품은 각기 다른 컬렉션으로 구성되어 공간에 맞는 조명과 음향을 선택할 수 있어 더욱 다채로운 홈 오디오와 조명 경험을 즐길 수 있습니다. Zax 블루투스 스피커와 조명 컬렉션으로 특별한 공간을 완성해보세요.',
			date: '2023.07.26',
			user: '김용진',
		},
		{
			title: '스마트 요리기구 세트와 인덕션 가스레인지',
			topic: '프로모션',
			content:
				'이케아의 스마트 요리기구 세트와 인덕션 가스 레인지를 소개합니다. 스마트한 기능이 탑재된 요리기구 세트로 요리를 더욱 편리하고 즐겁게 즐겨보세요. 또한 인덕션 가스 레인지는 빠르고 효율적으로 요리를 할 수 있도록 도와줍니다. 이케아의 스마트 요리기구 세트와 인덕션 가스 레인지로 맛있고 건강한 요리를 즐겨보세요.',
			date: '2023.07.26',
			user: '김진솔',
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

const promotionReducer = (state = initPromotion, action) => {
	switch (action.type) {
		case 'SET_PROMOTION':
			return {
				...state,
				promotion: action.payload,
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
const reducers = combineReducers({ memberReducer, subYoutubeReducer, mainYoutubeReducer, museumReducer, promotionReducer });
export default reducers;
