function Footer({ type, imgBg }) {
	const path = process.env.PUBLIC_URL;
	return (
		<footer id='footer' className={type}>
			<img src={path + `/img/${imgBg}.png`} alt='' />

			<div class='footerContainer'>
				<div class='footerCategory'>
					<div class='footerTopWrap'>
						<ul class='footerTop'>
							<li>International sales</li>
							<li>About IKEA</li>
							<li>IKEA Museum</li>
						</ul>
						<ul class='footerDown'>
							<li>Work with us</li>
							<li>Ethics</li>
						</ul>
					</div>
				</div>
				<div class='footerLeftCategory'>
					<ul>
						<li>Cookie information</li>
						<li>Privacy statment</li>
					</ul>
					<ul>
						<li>© Inter IKEA Systems B.V. 1999 - 2023</li>
					</ul>
					<ul>
						<li>Co-worker Login</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
