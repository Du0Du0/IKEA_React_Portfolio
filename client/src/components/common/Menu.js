import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useImperativeHandle } from 'react';

// props와 ref를 인자로 받음
function Menu(props, ref) {
	const [IsOpen, setIsOpen] = useState(false);

	// 1번인자 : ref
	// 2번인자 : toggle 함수를 useImperativeHandle을 사용하여 ref로 전달
	useImperativeHandle(ref, () => {
		return { toggle: () => setIsOpen(!IsOpen) };
	});

	useEffect(() => {
		setIsOpen(false);
	}, []);
	const active = { color: '#17809b' };
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
										<h2>IKEA Category</h2>
									</Link>
									<br />
									<NavLink to='/login' activeStyle={active}>
										<FontAwesomeIcon icon={faUser} />
										&nbsp;&nbsp;<span>Login</span>
									</NavLink>
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

					<div className={IsOpen ? 'rightBar rgt' : 'rightBar'}></div>
				</>
			)}
		</React.Fragment>
	);
}

export default forwardRef(Menu);
