import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useImperativeHandle } from 'react';
import firebase from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
//menuSlice로 부터 전역state값을 변경해주는 close함수를 import
import { close } from '../../redux-toolkit/menuSlice';

// props와 ref를 인자로 받음
function Menu() {
	// const user = useSelector((store) => store.user);
	// console.log(user);

	const active = { color: '#17809b' };
	const dispatch = useDispatch();
	const menu = useSelector((store) => store.menu.open);

	// useSelector를 사용하여 Redux 상태에서 displayName 가져오기
	// const displayName = useSelector((state) => state.userReducer.displayName);

	return (
		<React.Fragment>
			{/* header left side bar  */}
			{menu && (
				<>
					<div className={menu ? 'leftBar lft' : 'leftBar'}>
						<div className='leftBarWrap'>
							<button onClick={() => dispatch(close())}>close</button>
							{/* header left side title */}
							<div className='leftBarTit'>
								<div className='titWrap'>
									<Link to='/'>
										<h2>IKEA Category</h2>
									</Link>
									<br />
									{/* <div className='loginStatus'>
										<FontAwesomeIcon icon={faUser} />
										<span>
											{displayName ? (
												`${displayName}` + '님,  안녕하세요.'
											) : (
												<NavLink to='/login' activeStyle={active}>
													<button>로그인</button>
												</NavLink>
											)}
										</span>
										<span>{displayName ? <button onClick={() => firebase.auth().signOut()}>로그아웃</button> : ''}</span>
									</div> */}
								</div>
							</div>

							{/* header left side category list  */}
							<div className='leftBarList'>
								<div className='listLine'></div>
								<ul>
									<li>
										<NavLink to='/youtube' activeStyle={active}>
											Youtube
										</NavLink>
									</li>
									<li>
										<NavLink to='/community/articles' activeStyle={active}>
											Community
										</NavLink>
									</li>
									<li>
										<NavLink to='/member' activeStyle={active}>
											Members
										</NavLink>
									</li>
									<li>
										<NavLink to='/contact' activeStyle={active}>
											Contact
										</NavLink>
									</li>
									<li>
										<NavLink to='/gallery' activeStyle={active}>
											Gallery
										</NavLink>
									</li>
									<li>
										<NavLink to='/department' activeStyle={active}>
											Department
										</NavLink>
									</li>
								</ul>
								<ul>
									{/* ikea twitter icon */}
									<li>
										<a href='https://twitter.com/IKEA' target='_blank' title='새창-이케아 미국 트위터' rel='noreferrer'>
											<FontAwesomeIcon icon={faTwitter} />
										</a>
									</li>
									{/* ikea facebook icon */}
									<li>
										<a href='https://www.facebook.com/IKEAUSA/' target='_blank' title='새창-이케아 미국 페이스북' rel='noreferrer'>
											<FontAwesomeIcon icon={faFacebookF} />
										</a>
									</li>
									{/* ikea kakao icon */}
									<li>
										<a href='https://pf.kakao.com/_jhmfxd' target='_blank' title='새창-이케아 코리아 카카오톡' rel='noreferrer'>
											<FontAwesomeIcon icon={faEnvelope} />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className={menu ? 'rightBar rgt' : 'rightBar'}></div>
				</>
			)}
		</React.Fragment>
	);
}

export default Menu;
