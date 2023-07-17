import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useImperativeHandle } from 'react';

// props와 ref를 인자로 받음
function Menu(props, ref) {
	const [Open, setOpen] = useState(false);

	// 1번인자 : ref
	// 2번인자 : toggle 함수를 useImperativeHandle을 사용하여 ref로 전달
	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});

	useEffect(() => {
		setOpen(false);
	}, []);

	return (
		<React.Fragment>
			{/* header left side bar  */}
			{Open && (
				<>
					<div className={Open ? 'leftBar lft' : 'leftBar'}>
						<div className='leftBarWrap'>
							{/* header left side title */}
							<div className='leftBarTit'>
								<h2>IKEA Category</h2>
							</div>
							{/* header left side category list  */}
							<div className='leftBarList'>
								<div className='listLine'></div>
								<ul>
									<li>
										<NavLink to='/youtube' activeClass='active'>
											Youtube
										</NavLink>
									</li>
									<li>
										<NavLink to='/community' activeClass='active'>
											Community
										</NavLink>
									</li>
									<li>
										<NavLink to='/member' activeClass='active'>
											Members
										</NavLink>
									</li>
									<li>
										<NavLink to='/contact' activeClass='active'>
											Contact
										</NavLink>
									</li>
									<li>
										<NavLink to='/gallery' activeClass='active'>
											Gallery
										</NavLink>
									</li>
									<li>
										<NavLink to='/department'>Department</NavLink>
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

					<div className={Open ? 'rightBar rgt' : 'rightBar'}></div>
				</>
			)}
		</React.Fragment>
	);
}

export default forwardRef(Menu);
