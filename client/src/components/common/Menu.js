import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../firebase';

function Menu(props, ref) {
	const [IsOpen, setIsOpen] = useState(false);
	const active = { color: '#17809b' };

	// useSelector를 사용해 Redux 상태에서 displayName 가져옴
	const displayName = useSelector((state) => state.userReducer.displayName);

	useImperativeHandle(ref, () => {
		return { toggle: () => setIsOpen(!IsOpen) };
	});

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const openNewTab = (url) => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};

	return (
		<React.Fragment>
			{/* header left side bar  */}
			{IsOpen && (
				<>
					<div className={IsOpen ? 'leftBar lft' : 'leftBar'}>
						<div className='leftBarWrap'>
							{/* header left side title */}
							<div className='leftBarTit'>
								<div className='titWrap'>
									<Link to='/'>
										<h2>IKEA CATEGORY</h2>
									</Link>
									<br />
									<div className='loginStatus'>
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
									</div>
								</div>
							</div>

							{/* header left side category list  */}
							<div className='leftBarList'>
								<div className='listLine'></div>
								<ul>
									<li>
										<NavLink to='/ourBusiness' activeStyle={active}>
											Our Business
										</NavLink>
									</li>
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
											Member
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
										<NavLink to='/join' activeStyle={active}>
											Join
										</NavLink>
									</li>
									<li>
										<NavLink to='/faq' activeStyle={active}>
											FAQ
										</NavLink>
									</li>
								</ul>
								<ul>
									{/* ikea twitter icon */}
									<li>
										<FontAwesomeIcon
											icon={faTwitter}
											onClick={() => {
												openNewTab('https://twitter.com/IKEA');
											}}
										/>
									</li>
									{/* ikea facebook icon */}
									<li>
										<FontAwesomeIcon
											icon={faFacebookF}
											onClick={() => {
												openNewTab('https://www.facebook.com/IKEAUSA');
											}}
										/>
									</li>
									{/* ikea kakao icon */}
									<li>
										<FontAwesomeIcon
											icon={faEnvelope}
											onClick={() => {
												openNewTab('https://pf.kakao.com/_jhmfxd');
											}}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className={IsOpen ? 'rightBar rgt' : 'rightBar'}></div>
				</>
			)}
		</React.Fragment>
	);
}

export default forwardRef(Menu);
