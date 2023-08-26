import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState, useRef } from 'react';
import LayoutNone from '../../common/LayoutNone';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

function Community() {
	const history = useHistory();
	const today = moment();

	// pagination
	const [Currentpage, setCurrentpage] = useState(1);
	const [postPerPage] = useState(8);
	const indexOfLastPost = Currentpage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;

	//article date fillter
	const startDateRef = useRef(null);
	const endDateRef = useRef(null);
	const ignoreDateRef = useRef(null);
	const [IgnoreCheck, setIgnoreCheck] = useState(false);
	const [ActiveDateBtn, setActiveDateBtn] = useState(null);
	const activeDateBtnStyle = {
		background: '#606060',
		color: '#fff',
	};
	const oneWeekAgo = moment().subtract(1, 'weeks');
	const oneMonthAgo = moment().subtract(1, 'months');
	const threeMonthsAgo = moment().subtract(3, 'months');
	const oneWeekBtn = useRef(null);
	const oneMonthBtn = useRef(null);
	const threeMonthBtn = useRef(null);

	// article naming fillter
	const searchTopic = useRef(null);
	const searchWhat = useRef(null);
	const searchInput = useRef(null);

	// fillter display screen
	const [NotFoundErr, setNotFoundErr] = useState('');
	const [ShowArticleLists, setShowArticleLists] = useState(true);

	// article lists type
	const [IsListType, setIsListType] = useState(false);

	const dummy = [
		{
			userId: 'ikeastyle',
			topic: '전시',
			title: '이케아 한국, 다가오는 전시와 이벤트 소식',
			keyword: ['이케아, 전시, 이벤트, 소식'],
			content:
				'이케아 한국에서 여러분을 위해 다가오는 전시와 이벤트 소식을 알려드립니다! 현대적이고 세련된 디자인의 가구와 소품들로 가득 찬 이케아 전시를 만나보세요. 또한, 특별한 이벤트와 할인 행사들로 여러분을 찾아뵙기를 기다리고 있습니다. 이케아와 함께하는 특별한 시간을 놓치지 마세요!',
			date: '2023-06-21T03:36:57.998Z',
			password: 1111,
			comments: [
				{ comment: '할인 관련 공지는 없나요?', date: '2023-08-04T19:02:25.371Z', likeBtn: 1 },
				{ comment: '유료인가요?', date: '2023-08-06T19:02:25.371Z', likeBtn: 0 },
				{ comment: '자세한 이벤트는 어디서 볼 수 있나요?', date: '2023-08-02T19:02:25.371Z', likeBtn: 2 },
			],
		},
		{
			userId: '인사이더',
			topic: '문의',
			title: '많이 하는 제품 문의',
			keyword: ['인사이더, 제품 문의'],
			content:
				'이케아 인사이더에게 궁금한 제품들에 대한 문의를 남겨보세요! 제품의 상세 정보와 사용 방법에 대해 도움을 드리고, 인테리어에 관한 유용한 정보도 제공해드립니다. 이케아 제품을 더욱 잘 활용하는 팁과 노하우를 전해드리며, 집 안에서의 즐거움을 더욱 높여보세요.',
			date: '2023-05-21T03:36:57.998Z',
			password: 1111,
			comments: [{ comment: '고객센터 번호 알려주세요', date: '2023-06-04T19:02:25.371Z', likeBtn: 1 }],
		},
		{
			userId: ' ikeahomeevent',
			topic: '이벤트',
			title: '이케아 홈 이벤트, 특별한 추억 만들기',
			keyword: ['이케아, 홈 이벤트, 추억, 특별한 경험'],
			content:
				'이케아 홈 이벤트에서 특별한 추억을 만들어보세요! 다양한 가구와 소품들로 인테리어를 꾸미고, 집 안에서의 따뜻한 시간을 보낼 수 있습니다. 이벤트 기간 동안 특별한 할인 혜택과 이케아만의 특별한 경험들이 여러분을 기다리고 있습니다. 특별한 날을 함께 채워보세요!',
			date: '2023-04-21T03:36:57.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: 'ikeafun',
			topic: '이벤트',
			title: '이케아 펀, 다양한 이벤트로 놀라운 경험',
			keyword: ['이케아, 펀, 다양한 이벤트, 경험'],
			content:
				'이케아 펀에서 다양한 이벤트와 놀라운 경험을 만나보세요! 신제품 런칭 이벤트, 특별한 워크샵, 가구 조립 대회 등 다채로운 행사들이 여러분을 기다리고 있습니다. 이케아의 창의적이고 즐거운 이벤트로 재미있는 시간을 보내고, 더 많은 이케아의 매력을 발견해보세요.',
			date: '2023-03-21T03:36:57.998Z',
			password: 1111,
			comments: [
				{ comment: '커플 할인되나요?', date: '2023-05-04T19:02:25.371Z', likeBtn: 1 },
				{ comment: '언제부터인가요', date: '2023-06-02T19:02:25.371Z', likeBtn: 0 },
				,
				{ comment: '기대할께요^^', date: '2023-07-04T19:02:25.371Z', likeBtn: 0 },
			],
		},
		{
			userId: '이케아서포트팀',
			topic: '요청',
			title: '이케아 지원센터, 도움이 필요한 모든 순간',
			keyword: ['지원센터, 도움, 모멘트'],
			content:
				'이케아 지원센터에서는 여러분이 도움이 필요한 모든 순간을 지원합니다. 제품 사용법, 조립 방법, 인테리어 팁, 유용한 정보 등 여러분이 원하는 모든 것을 이곳에서 찾아보세요. 이케아의 전문가들이 여러분을 위한 유용한 정보와 노하우를 제공합니다. 함께 만드는 더 나은 공간을 위해 이케아 지원센터와 함께하세요.',
			date: '2023-02-21T03:36:57.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: 'ikeavoice',
			topic: '요청',
			title: '이케아 의견 요청, 여러분의 목소리를 들려주세요',
			keyword: ['이케아, 의견 요청, 목소리'],
			content:
				'이케아는 여러분의 목소리를 소중히 여깁니다. 제품 개선을 위해 여러분의 소중한 의견을 기다립니다. 제품 사용 중 불편한 점이나 개선사항, 원하는 제품 라인업 등 여러분의 아이디어를 이케아에게 전달해주세요. 여러분의 목소리로 더 나은 이케아를 만들어가겠습니다.',
			date: '2023-01-21T03:36:57.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '고객지원센터',
			topic: '요청',
			title: '제품 사용에 도움이 필요합니다',
			keyword: ['고객지원', '요청', '제품 사용'],
			content:
				'안녕하세요, 이케아 고객지원센터입니다. 제품 사용에 관한 궁금한 사항이나 문제가 있으신가요? 언제든지 문의 주시면 친절하고 빠른 도움을 드리겠습니다. 제품 조립 방법이나 기타 이용 중 발생한 문제에 대해 상세히 설명해주시면 보다 정확한 답변을 드릴 수 있습니다. 이케아 제품으로 편안하고 아름다운 생활을 즐기시기를 기대하며, 저희 고객지원센터는 항상 여러분과 함께 합니다. 궁금한 사항이 있으시면 언제든지 문의해주세요. 감사합니다.',
			date: '2023-06-21T09:15:27.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '제품문의마스터',
			topic: '문의',
			title: '인기 제품에 문의드립니다',
			keyword: ['제품 문의', '인기 제품'],
			content:
				'안녕하세요, 제품문의마스터입니다. 인기 제품들에 대해 궁금한 점이 있으신가요? 제품의 상세 정보와 사용 방법을 알고 싶거나 다른 고객들의 리뷰를 듣고 싶으시면 망설이지 말고 문의해주세요. 고객 여러분의 궁금증을 해소하기 위해 최선을 다하고 있습니다. 이케아 제품은 고객님들께서 보다 편리하고 행복한 일상을 즐기실 수 있도록 설계되었습니다. 고객님들의 소중한 의견을 듣고, 더 나은 제품을 제공하기 위해 노력하고 있습니다. 감사합니다.',
			date: '2023-06-20T14:25:12.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '이달의 이벤트 소식 알려드립니다',
			keyword: ['이벤트', '이달의 이벤트'],
			content:
				'다양한 이벤트가 기다리고 있습니다. 이케아와 함께 특별한 시간을 만들어보세요! 특별한 할인 혜택과 이벤트 기간 중에만 제공되는 특별한 경험들이 여러분을 기다리고 있습니다. 이달의 이벤트 소식을 놓치지 마시고, 이케아 매장을 방문하여 여러분만을 위한 특별한 경험을 즐겨보세요. 이벤트 기간 동안 즐거움을 만끽하며, 이케아만의 매력을 발견해보세요. 함께 즐거운 추억을 만들어보시기 바랍니다. 감사합니다.',
			date: '2023-06-19T11:30:10.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '커뮤니티멤버',
			topic: '전시',
			title: '다가오는 전시 소식 공유합니다',
			keyword: ['전시 소식', '다가오는 전시'],
			content:
				'안녕하세요, 커뮤니티멤버입니다. 이케아 한국에서 다가오는 전시와 이벤트 소식을 알려드립니다! 현대적이고 세련된 디자인의 가구와 소품들로 가득 찬 이케아 전시를 만나보세요. 또한, 특별한 이벤트와 할인 행사들로 여러분을 찾아뵙기를 기다리고 있습니다. 이케아와 함께하는 특별한 시간을 놓치지 마세요! 자세한 내용은 커뮤니티 페이지에서 확인해주세요.',
			date: '2023-06-18T17:45:50.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이용안내담당자',
			topic: '요청',
			title: '이용 안내 사항을 안내드립니다',
			keyword: ['이용 안내', '공지'],
			content:
				'안녕하세요, 이용안내담당자입니다. 이케아 매장 이용 시 유의사항과 안내사항을 안내드립니다. 매장 내의 체크인 및 체크아웃 절차, 제품 시연 및 구매 방법, 주차 시 주의사항 등을 확인하시고 편리하게 매장을 이용해주세요. 고객님들의 안전과 편의를 위해 꼭 숙지하시길 바랍니다. 이케아 매장은 언제나 여러분을 환영합니다. 이용안내를 자세히 보시려면 매장 이용 안내 게시물을 참고해주세요.',
			date: '2023-06-17T08:20:05.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이케아모바일',
			topic: '문의',
			title: '이케아 모바일 앱 소식 알려드립니다',
			keyword: ['이케아모바일', '앱 소식'],
			content:
				'안녕하세요, 이케아모바일입니다. 이케아를 더 편리하게 이용할 수 있는 모바일 앱을 소개합니다. 모바일 앱을 통해 제품 검색, 구매, 배송 조회, 매장 방문 예약 등 다양한 기능을 편리하게 이용할 수 있습니다. 또한, 특별한 할인 혜택과 이벤트 소식을 놓치지 않고 받아보실 수 있습니다. 이케아모바일을 설치하여 더 많은 혜택과 편의를 누려보세요. 자세한 내용은 이케아모바일 앱 페이지에서 확인하실 수 있습니다.',
			date: '2023-06-16T12:10:30.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '디자인마스터',
			topic: '전시',
			title: '세련된 디자인 소품 소식 공유합니다',
			keyword: ['디자인 소식', '세련된 디자인'],
			content:
				'안녕하세요, 디자인마스터입니다. 이케아에서 세련된 디자인의 가구와 소품들을 소개합니다. 트렌디하고 현대적인 디자인으로 공간을 더욱 특별하게 꾸며보세요. 신제품 런칭 소식과 디자인 트렌드, 인테리어 팁을 제공하여 고객님들의 삶을 더욱 풍요롭게 만들어드리겠습니다. 세련된 디자인의 매력을 느껴보시려면 디자인 소식 페이지를 확인해주세요.',
			date: '2023-06-15T16:55:20.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '여름 특별 이벤트가 시작되었습니다',
			keyword: ['여름 이벤트', '특별 이벤트'],
			content:
				'안녕하세요, 이벤트마스터입니다. 여름을 맞아 특별한 이벤트를 준비했습니다. 시원한 여름을 보내며 여러분들에게 즐거운 시간을 선사하고자 합니다. 다양한 이벤트와 특별한 혜택들이 준비되어 있으니, 여러분의 많은 참여 부탁드립니다. 함께 즐거운 추억을 만들어보시기 바랍니다. 여름 특별 이벤트의 상세 내용은 이벤트 페이지에서 확인해주세요. 여러분들의 많은 관심과 참여를 기다리겠습니다. 감사합니다.',
			date: '2023-06-13T10:05:37.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '제품리뷰마스터',
			topic: '이벤트',
			title: '이케아 제품 리뷰를 남겨주세요',
			keyword: ['제품 리뷰', '이케아 제품'],
			content:
				'안녕하세요, 제품리뷰마스터입니다. 이케아 제품을 사용하셨나요? 제품의 사용 경험과 만족도를 다른 고객들과 공유해주세요. 솔직한 리뷰를 통해 다른 분들께 도움이 되는 정보를 제공하시면 큰 도움이 됩니다. 좋은 리뷰나 개선이 필요한 점들을 소중히 받아들이고 있습니다. 여러분의 소중한 의견을 기다리고 있으니, 많은 리뷰 부탁드립니다. 이케아 제품의 리뷰를 작성하시려면 리뷰 페이지로 방문해주세요.',
			date: '2023-06-12T14:50:20.998Z',
			password: 1111,
			comments: [],
		},

		{
			userId: '이용안내담당자',
			topic: '요청',
			title: '매장 이용 안내사항을 확인해주세요',
			keyword: ['이용 안내', '매장 이용'],
			content:
				'안녕하세요, 이용안내담당자입니다. 이케아 매장을 방문하시기 전에 이용 안내사항을 반드시 확인해주세요. 매장 내 체크인 및 체크아웃 절차, 제품 시연 및 구매 방법, 주차 시 주의사항 등을 숙지하시면 보다 편리하고 즐거운 시간을 보낼 수 있습니다. 고객님들의 안전을 위해 이용 안내사항을 꼭 준수해주시길 바라며, 매장 이용에 관련된 모든 사항은 매장 이용 안내 페이지에서 확인하실 수 있습니다. 감사합니다.',
			date: '2023-06-10T20:30:15.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '고객센터',
			topic: '요청',
			title: '고객님들의 소중한 의견을 기다립니다',
			keyword: ['고객님들의 의견', '요청'],
			content:
				'안녕하세요, 이케아 고객센터입니다. 고객님들의 소중한 의견을 기다리고 있습니다. 제품 사용 중 불편한 점이나 개선사항, 원하는 제품 라인업 등 여러분의 아이디어를 이케아에게 전달해주세요. 여러분의 목소리로 더 나은 이케아를 만들어가겠습니다. 고객센터는 항상 여러분의 편의를 위해 노력하고 있으며, 여러분의 의견을 반영하여 더 나은 서비스를 제공하고자 합니다. 궁금하신 사항이 있으시면 언제든지 문의해주세요. 감사합니다.',
			date: '2023-06-09T23:50:40.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '오늘 마감되는 이벤트를 놓치지 마세요',
			keyword: ['오늘 마감', '이벤트'],
			content:
				'안녕하세요, 이벤트마스터입니다. 오늘 마감되는 특별한 이벤트들을 놓치지 마세요! 다양한 이벤트와 특별한 혜택들이 마감일이 다가오고 있습니다. 지금까지 참여하지 못한 이벤트들을 놓치지 않도록 서둘러주세요. 이벤트 기간 중에만 제공되는 특별한 경험을 누려보세요. 이벤트 마감 시간은 이벤트 페이지에서 확인하실 수 있습니다. 더 많은 이벤트 참여로 즐거운 경험을 만끽하시기 바랍니다. 감사합니다.',
			date: '2023-06-08T12:45:22.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '새로운 이벤트가 시작되었습니다',
			keyword: ['새로운 이벤트', '이벤트 시작'],
			content:
				'안녕하세요, 이벤트마스터입니다. 새로운 이벤트가 시작되었습니다. 다양한 이벤트와 특별한 혜택들이 준비되어 있으니, 여러분의 많은 참여 부탁드립니다. 특별한 경험과 다채로운 행사들이 여러분을 기다리고 있습니다. 이벤트 기간 동안만 제공되는 특별한 혜택을 누려보세요. 이벤트 상세 내용은 이벤트 페이지에서 확인하실 수 있습니다. 더 많은 이벤트 참여로 즐거운 경험을 만끽하시기 바랍니다. 감사합니다.',
			date: '2023-06-04T14:40:12.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이용안내담당자',
			topic: '요청',
			title: '이케아 매장 이용 안내사항을 확인하세요',
			keyword: ['매장 이용 안내', '이용 안내'],
			content:
				'안녕하세요, 이용안내담당자입니다. 이케아 매장을 방문하실 때 알아두셔야 할 안내사항들을 안내드립니다. 매장 내 체크인 및 체크아웃 절차, 제품 시연 및 구매 방법, 주차 시 주의사항 등을 숙지하시면 보다 편리하고 즐거운 시간을 보낼 수 있습니다. 고객님들의 안전을 위해 이용 안내사항을 꼭 준수해주시길 바라며, 매장 이용에 관련된 모든 사항은 매장 이용 안내 페이지에서 확인하실 수 있습니다. 감사합니다.',
			date: '2023-06-03T09:55:25.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '주말 특별 이벤트가 시작되었습니다',
			keyword: ['주말 이벤트', '특별 이벤트'],
			content:
				'안녕하세요, 이벤트마스터입니다. 주말을 더욱 특별하게 만들어줄 주말 특별 이벤트가 시작되었습니다. 특별한 경험과 다채로운 행사들이 여러분을 기다리고 있습니다. 이벤트 기간 동안만 제공되는 특별한 혜택을 누려보세요. 이벤트에 참여하여 즐거운 시간을 보내시기를 바라며, 여러분의 많은 관심과 참여를 기다리겠습니다. 이벤트 상세 내용은 이벤트 페이지에서 확인하실 수 있습니다. 즐거운 주말 되시길 바랍니다. 감사합니다.',
			date: '2023-06-02T12:30:40.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '여름 특별 이벤트가 시작되었습니다',
			keyword: ['여름 이벤트', '특별 이벤트'],
			content:
				'안녕하세요, 이벤트마스터입니다. 여름을 맞아 특별한 이벤트를 준비했습니다. 시원한 여름을 보내며 여러분들에게 즐거운 시간을 선사하고자 합니다. 다양한 이벤트와 특별한 혜택들이 준비되어 있으니, 여러분의 많은 참여 부탁드립니다. 함께 즐거운 추억을 만들어보시기 바랍니다. 여름 특별 이벤트의 상세 내용은 이벤트 페이지에서 확인해주세요. 여러분들의 많은 관심과 참여를 기다리겠습니다. 감사합니다.',
			date: '2023-05-31T09:20:25.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '인사이더',
			topic: '이벤트',
			title: '많이 하는 이벤트에 참여해보세요',
			keyword: ['인사이더', '이벤트 참여'],
			content:
				'안녕하세요, 인사이더입니다. 이벤트에 참여하여 특별한 경험과 혜택을 누려보세요. 이케아에서 진행하는 다양한 이벤트들을 통해 특별한 시간을 만들어보실 수 있습니다. 제품 구매 이벤트, 인테리어 워크샵, 가구 조립 대회 등 다채로운 행사들이 여러분을 기다리고 있습니다. 이벤트에 대한 상세 내용은 인사이더 페이지에서 확인하실 수 있습니다. 즐거운 이벤트 참여를 기대하겠습니다. 감사합니다.',
			date: '2023-05-30T13:50:33.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '이용안내담당자',
			topic: '안내',
			title: '이케아 매장 이용 안내사항을 확인해주세요',
			keyword: ['매장 이용 안내', '이용 안내'],
			content:
				'안녕하세요, 이용안내담당자입니다. 이케아 매장을 방문하실 때 알아두셔야 할 안내사항들을 안내드립니다. 매장 내 체크인 및 체크아웃 절차, 제품 시연 및 구매 방법, 주차 시 주의사항 등을 숙지하시면 보다 편리하고 즐거운 시간을 보낼 수 있습니다. 고객님들의 안전을 위해 이용 안내사항을 꼭 준수해주시길 바라며, 매장 이용에 관련된 모든 사항은 매장 이용 안내 페이지에서 확인하실 수 있습니다. 감사합니다.',
			date: '2023-05-29T17:15:18.998Z',
			comments: [],
		},
		{
			userId: '이벤트마스터',
			topic: '이벤트',
			title: '오늘 마감되는 이벤트를 놓치지 마세요',
			keyword: ['오늘 마감', '이벤트'],
			content:
				'안녕하세요, 이벤트마스터입니다. 오늘 마감되는 특별한 이벤트들을 놓치지 마세요! 다양한 이벤트와 특별한 혜택들이 마감일이 다가오고 있습니다. 지금까지 참여하지 못한 이벤트들을 놓치지 않도록 서둘러주세요. 이벤트 기간 중에만 제공되는 특별한 경험을 누려보세요. 이벤트 마감 시간은 이벤트 페이지에서 확인하실 수 있습니다. 더 많은 이벤트 참여로 즐거운 경험을 만끽하시기 바랍니다. 감사합니다.',
			date: '2023-05-28T20:40:25.998Z',
			password: 1111,
			comments: [],
		},
		{
			userId: '제품문의마스터',
			topic: '문의',
			title: '제품에 대한 궁금증을 해소해드립니다',
			keyword: ['제품 문의', '궁금증 해소'],
			content:
				'안녕하세요, 제품문의마스터입니다. 이케아 제품에 대해 궁금한 사항이 있으신가요? 제품의 상세 정보와 사용 방법을 알고 싶거나 다른 고객들의 리뷰를 듣고 싶으시면 망설이지 말고 문의해주세요. 고객 여러분의 궁금증을 해소하기 위해 최선을 다하고 있습니다. 이케아 제품은 고객님들께서 보다 편리하고 행복한 일상을 즐기실 수 있도록 설계되었습니다. 고객님들의 소중한 의견을 듣고, 더 나은 제품을 제공하기 위해 노력하고 있습니다. 감사합니다.',
			date: '2023-05-27T12:55:30.998Z',
			password: 1111,
			comments: [],
		},
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};

	const [Posts, setPosts] = useState(getLocalData());
	const currentPosts = Posts.slice(indexOfFirstPost, indexOfLastPost);

	const goToDetail = (idx) => {
		history.push({
			pathname: `/community/articles/${idx}`,
			state: {
				Posts: [...Posts],
				idx: idx,
			},
		});
		console.log(Posts);
		console.log(idx);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	const pageChange = (page) => {
		setCurrentpage(page);
	};

	const [Search, setSearch] = useState(false);

	//검색1. 시작날짜, 마지막날짜 설정 후 맞는 조건 게시물 필터링
	const handleSubmitKeyDown = (e) => {
		searchDateInput();
		searchArticleKeyDown(e);
		setSearch(true);
		console.log('Search', Search);
	};

	console.log('Search', Search);

	const handleSubmitClick = () => {
		searchDateInput();
		searchArticleClick();
		setSearch(true);
	};

	const searchDateInput = () => {
		const startDate = startDateRef.current.value;
		const endDate = endDateRef.current.value;

		if (startDate && endDate) {
			const matchDatePosts = Posts.filter((post) => {
				// post.date 값을 Date 객체로 변환하여 검색 날짜와 비교
				const postDate = new Date(post.date);
				const start = new Date(startDate);
				const end = new Date(endDate);
				return postDate >= start && postDate <= end;
			});

			if (matchDatePosts === null) setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			else setPosts(matchDatePosts);
		}
	};

	const searchArticleKeyDown = (e) => {
		let copy = [...Posts];
		const selectedTopic = copy.filter((el) => el.topic.includes(searchTopic.current.value));
		setPosts(selectedTopic);

		if ((e.key === 'Enter' && searchWhat.current.value === '') || (e.key === 'Enter' && searchWhat.current.value === '제목')) {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.title.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (e.key === 'Enter' && searchWhat.current.value === '내용') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.content.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (e.key === 'Enter' && searchWhat.current.value === '작성자') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.userId.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
	};

	const searchArticleClick = () => {
		let copy = [...Posts];
		const selectedTopic = copy.filter((el) => el.topic.includes(searchTopic.current.value));
		setPosts(selectedTopic);

		if (searchWhat.current.value === '' || searchWhat.current.value === '제목') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.title.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (searchWhat.current.value === '내용') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.content.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
		if (searchWhat.current.value === '작성자') {
			let copy = [...Posts];
			const newFilter = copy.filter((el) => el.userId.includes(searchInput.current.value));
			if (newFilter.length === 0) {
				setShowArticleLists(false);
				return setNotFoundErr('해당 결과를 찾을 수 없습니다.');
			}
			setPosts(newFilter);
		}
	};

	return (
		<>
			<Helmet>
				<title>커뮤니티</title>
			</Helmet>
			<LayoutNone type={''} name1={'community'}>
				<div className='titTop'>
					<h1>커뮤니티</h1>
				</div>
				<div className='searchBarWrap'>
					<div className='searchBarTop'>
						<div className='dateInputContainer'>
							<input
								type='checkBox'
								name='nonDate'
								ref={ignoreDateRef}
								onClick={() => {
									setIgnoreCheck((IgnoreCheck) => !IgnoreCheck);
								}}
							/>
							<label htmlFor='nonDate'>날짜 미지정</label>
							<input type='date' className='dateInput' ref={startDateRef} disabled={IgnoreCheck ? true : false} />
							<span>-</span>
							<input type='date' className='dateInput' ref={endDateRef} disabled={IgnoreCheck ? true : false} />
						</div>

						<div className='dateBtnWrap'>
							<button
								ref={oneWeekBtn}
								onClick={() => {
									setActiveDateBtn(0);
									startDateRef.current.value = oneWeekAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 0 ? activeDateBtnStyle : null}
							>
								1주일
							</button>
							<button
								ref={oneMonthBtn}
								onClick={() => {
									setActiveDateBtn(1);
									startDateRef.current.value = oneMonthAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 1 ? activeDateBtnStyle : null}
							>
								1개월
							</button>
							<button
								ref={threeMonthBtn}
								onClick={() => {
									setActiveDateBtn(2);
									startDateRef.current.value = threeMonthsAgo.format('YYYY-MM-DD');
									endDateRef.current.value = today.format('YYYY-MM-DD');
								}}
								style={ActiveDateBtn === 2 ? activeDateBtnStyle : null}
							>
								3개월
							</button>
						</div>
					</div>
					<div className='searchBarBottom'>
						<div className='selectContainer'>
							<select className='searchTopic' ref={searchTopic}>
								<option value=''>분류 전체</option>
								<option value='문의'>문의</option>
								<option value='요청'>요청</option>
								<option value='전시'>전시</option>
								<option value='이벤트'>이벤트</option>
							</select>
							<select className='searchWhat' ref={searchWhat}>
								<option value=''>전체</option>
								<option value='제목'>제목</option>
								<option value='내용'>내용</option>
								<option value='작성자'>작성자</option>
							</select>
						</div>

						<input type='text' ref={searchInput} placeholder='검색어를 입력하세요' className='searchBar' onKeyDown={(e) => handleSubmitKeyDown(e)} />
						<FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmitClick} />
					</div>
				</div>
				<div className='btnContainer'>
					<button className='writeBtn' onClick={() => history.push('/write')} style={{ display: NotFoundErr || Search ? 'none' : 'block' }}>
						글쓰기
					</button>
					<button className='seeCommunityList' onClick={() => window.location.replace('/community/articles')} style={{ display: NotFoundErr || Search ? 'block' : 'none' }}>
						목록
					</button>

					<div className='rightBtnWrap'>
						<p>
							전체 <span>{Posts.length}</span>건
						</p>
						<select
							className='arrayBtn'
							onClick={(e) => {
								if (e.target.value === '오름차순') {
									const copyPosts = [...Posts];
									const ascArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title));
									setPosts(ascArr);
								} else if (e.target.value === '내림차순') {
									const copyPosts = [...Posts];
									const descArr = copyPosts.sort((a, b) => a.title.localeCompare(b.title)).reverse();
									setPosts(descArr);
								} else if (e.target.value === '최신순') {
									const copyPosts = [...Posts];
									const ascDate = copyPosts.sort((a, b) => a.date.localeCompare(b.date)).reverse();
									setPosts(ascDate);
								}
							}}
						>
							<option value=''>정렬하기</option>
							<option value='오름차순'>오름차순</option>
							<option value='내림차순'>내림차순</option>
							<option value='최신순'>최신순</option>
						</select>{' '}
						&nbsp;
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='18'
							viewBox='0 0 20 18'
							onClick={() => {
								setIsListType(false);
							}}
							style={{ fill: IsListType === false ? '#17809b' : '#171717' }}
						>
							<path
								id='align_card'
								d='M22-11v7a.966.966,0,0,1-.29.71A.966.966,0,0,1,21-3H13v-8ZM11-11v8H3a.966.966,0,0,1-.71-.29A.966.966,0,0,1,2-4v-7Zm0-10v8H2v-7a.966.966,0,0,1,.29-.71A.966.966,0,0,1,3-21Zm10,0a.966.966,0,0,1,.71.29A.966.966,0,0,1,22-20v7H13v-8Z'
								transform='translate(-2 21)'
							></path>
						</svg>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='18'
							viewBox='0 0 20 18'
							onClick={() => {
								setIsListType(true);
							}}
							style={{ fill: IsListType === true ? '#17809b' : '#171717' }}
						>
							<path
								id='align_row'
								d='M22-11v7a.966.966,0,0,1-.29.71A.966.966,0,0,1,21-3H13v-8Zm-9,0v8H3a.966.966,0,0,1-.71-.29A.966.966,0,0,1,2-4v-7Zm0-10v8H2v-7a.966.966,0,0,1,.29-.71A.966.966,0,0,1,3-21Zm8,0a.966.966,0,0,1,.71.29A.966.966,0,0,1,22-20v7H13v-8Z'
								transform='translate(-2 21)'
							></path>
						</svg>
					</div>
				</div>
				<div className='horzienLine' />
				<div className={IsListType === false ? 'listWrap roomy' : 'listWrap'}>
					{ShowArticleLists ? (
						Posts &&
						currentPosts.map((post, idx) => {
							return (
								<div
									className='list'
									key={idx}
									onClick={() => {
										goToDetail(idx);
									}}
								>
									<h3>{post.topic}</h3>
									<h2>{!IsListType && `${post.title}`.length > 18 ? `${post.title}`.substr(0, 15) + '...' : `${post.title}`}</h2>
									<div className='bottomWrap'>
										<p>{`${post.date}`.substr(0, 10)}</p>
										<p>{`${post.userId}`.substr(0, 3).replace(/^(.)(.*)$/, '$1**')}</p>
										<p>
											<FontAwesomeIcon icon={faCommentDots} />
											{post.comments ? post.comments.length : 0}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<p className='notFoundErr'>{NotFoundErr && NotFoundErr}</p>
					)}
				</div>
				<div className='horzienLine2' />
				<Pagination activePage={Currentpage} itemsCountPerPage={8} totalItemsCount={30} pageRangeDisplayed={3} prevPageText={'‹'} nextPageText={'›'} onChange={pageChange} />;
			</LayoutNone>
		</>
	);
}

export default Community;
