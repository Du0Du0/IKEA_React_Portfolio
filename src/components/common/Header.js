import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

function Header({ type }) {
	const [Menu, setMenu] = useState(false);
	const [IsRgtOn, setIsRgtOn] = useState(false);

	//when click the hamburger button, header is opened
	const headerToggle = () => {
		setMenu((Menu) => !Menu);
		console.log('메뉴');
		headerBtnToggle();
	};

	/* 
	when header sideBar is opened, button is changed to closeBtn
	when  closed, button is changed to hamburgerBtn
	*/
	function headerBtnToggle() {
		setIsRgtOn((IsRgtOn) => !IsRgtOn);
	}

	return (
		// props로 전달되는 type값을 header의 class명으로 지정해서 스타일 분기처리
		<header className={type}>
			<div className='menu'>
				<FontAwesomeIcon icon={faBarsStaggered} onClick={headerToggle} style={IsRgtOn ? { display: 'block' } : { display: 'none' }} />
				<FontAwesomeIcon icon={faXmark} onClick={headerToggle} style={IsRgtOn ? { display: 'none' } : { display: 'block' }} />
			</div>
			<div className='logo'>
				<h1>
					{/* NavLink를 사용하면 activeStyle에 적용되는 스타일을 따로 적용가능 */}
					<Link to='/'>IKEA</Link>
				</h1>
			</div>

			{/* header right side bar  */}
			<div
				class={Menu ? 'rightBar' : 'rightBar rgt'}
				onChange={() => {
					headerBtnToggle();
				}}
			></div>
			{/* header left side bar  */}
			<div class={Menu ? 'leftBar' : 'leftBar lft'}>
				<div class='leftBarWrap'>
					{/* header left side title */}
					<div class='leftBarTit'>
						<h2>IKEA Category</h2>
					</div>
					{/* header left side category list  */}
					<div class='leftBarList'>
						<div class='listLine'></div>
						<ul>
							<li>
								<NavLink to='/youtube' activeClassName='active'>
									Youtube
								</NavLink>
							</li>
							<li>
								<NavLink to='/community' activeClassName='active'>
									Community
								</NavLink>
							</li>
							<li>
								<NavLink to='/members' activeClassName='active'>
									Members
								</NavLink>
							</li>
							<li>
								<NavLink to='/contact' activeClassName='active'>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeClassName='active'>
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
								<a href='https://twitter.com/IKEA' target='_blank' title='새창-이케아 미국 트위터'>
									<FontAwesomeIcon icon={faTwitter} />
								</a>
							</li>
							{/* ikea facebook icon */}
							<li>
								<a href='https://www.facebook.com/IKEAUSA/' target='_blank' title='새창-이케아 미국 페이스북'>
									<FontAwesomeIcon icon={faFacebookF} />
								</a>
							</li>
							{/* ikea kakao icon */}
							<li>
								<a href='https://pf.kakao.com/_jhmfxd' target='_blank' title='새창-이케아 코리아 카카오톡'>
									<FontAwesomeIcon icon={faEnvelope} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
