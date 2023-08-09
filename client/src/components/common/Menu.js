import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import firebase from '../../firebase';
//menuSlice로 부터 전역state값을 변경해주는 close함수를 import
import { close } from '../../redux-toolkit/menuSlice';
import { useGlobalData } from '../../hooks/useGlobalContext';

// props와 ref를 인자로 받음
function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const active = { color: '#17809b' };

	return (
		<React.Fragment>
			{/* header left side bar  */}
			{MenuOpen && (
				<>
					<div className={MenuOpen ? 'leftBar lft' : 'leftBar'}>
						<div className='leftBarWrap'>
							<button onClick={() => setMenuOpen(false)}>close</button>
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

					<div className={MenuOpen ? 'rightBar rgt' : 'rightBar'}></div>
				</>
			)}
		</React.Fragment>
	);
}

export default Menu;
