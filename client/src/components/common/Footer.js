function Footer({ type, imgBg }) {
	const path = process.env.PUBLIC_URL;
	return (
		<footer id='footer' className={type}>
			<img src={path + `/img/${imgBg}.png`} alt='' />

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
						<li>© Inter IKEA Systems (Optimized for Resolution: 1920x1080)</li>
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

export default Footer;
