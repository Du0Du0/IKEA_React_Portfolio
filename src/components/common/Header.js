import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useState, useRef, useEffect } from 'react';
import Menu from './Menu';

function Header({ type }) {
	const menuRef = useRef(null);

	return (
		// props로 전달되는 type값을 header의 class명으로 지정해서 스타일 분기처리
		<header className={type}>
			<div className='menu'>
				<FontAwesomeIcon
					icon={faBarsStaggered}
					onClick={() => {
						menuRef.current.toggle();
						console.log('menuRef.current', menuRef.current);
					}}
				/>
				<FontAwesomeIcon icon={faXmark} />
			</div>
			<div className='logo'>
				<h1>
					{/* NavLink를 사용하면 activeStyle에 적용되는 스타일을 따로 적용가능 */}
					<Link to='/'>IKEA</Link>
				</h1>
			</div>
			<Menu ref={menuRef} />
		</header>
	);
}

export default Header;
