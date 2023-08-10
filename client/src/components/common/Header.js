import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';

function Header({ type }) {
	const menuRef = useRef(null);

	return (
		<header className={type}>
			<div className='menu'>
				<FontAwesomeIcon
					icon={faBarsStaggered}
					onClick={() => {
						menuRef.current.toggle();
					}}
				/>
				<FontAwesomeIcon icon={faXmark} />
			</div>
			<div className='logo'>
				<h1>
					<Link to='/ikea-react'>IKEA</Link>
				</h1>
			</div>
			<Menu ref={menuRef} />
		</header>
	);
}

export default Header;
