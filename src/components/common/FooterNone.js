import { useSelector } from 'react-redux';

function FooterNone({ type }) {
	const Designer = useSelector((store) => store.memberReducer.members[0].name);

	return (
		<footer id='footerNone' className={type}>
			<div className='footerContainer'>
				<div className='footerCategory'>
					<div className='footerTopWrap'>
						<ul className='footerTop'>
							<li>International sales</li>
							<li>About IKEA</li>
							<li>IKEA Museum</li>
						</ul>
						<ul className='footerDown'>
							<li>Work with us</li>
							<li>Ethics</li>
						</ul>
					</div>
				</div>
				<div className='footerLeftCategory'>
					<ul>
						<li>Cookie information</li>
						<li>Privacy statment</li>
					</ul>
					<ul>
						<li>{`© Inter IKEA Systems B.V. 1999 - 2023 established by ${Designer} (Optimized for Resolution: 1920x1080)`}</li>
					</ul>
					<ul>
						<li>Co-worker Login</li>
						<li>Terms of Use</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default FooterNone;
