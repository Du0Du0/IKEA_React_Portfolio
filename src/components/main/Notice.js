function Notice() {
	return (
		<section id='notice' class='myScroll'>
			<div class='noticeContainer'>
				{/* left part   */}
				<div class='noticeWrap'>
					{/* section notice title  */}
					<h4>공지사항</h4>
					{/* go button start */}
					<div class='goBtn'>
						<a href='#' target='_self' title='현재창-공지사항'>
							<p>
								바로가기&nbsp;&nbsp;&nbsp;
								<span>
									<i class='fa-solid fa-arrow-right' aria-hidden='true'></i>
								</span>
							</p>
						</a>
					</div>
					{/* icon container start */}
					<p class='iconWrap'>
						{/* facebook  */}
						<span>
							<a href='https://www.facebook.com/IKEA.kr/?locale=ko_KR' target='_blank' title='새창-이케아 코리아 페이스북'>
								<i class='fa-brands fa-facebook-f'></i>
							</a>
						</span>
						{/* youtube  */}
						<span>
							<a href='https://www.youtube.com/channel/UCvt32qJUh606U-W_hr-EF7A' target='_blank' title='새창-이케아 코리아 유튜브'>
								<i class='fa-brands fa-youtube'></i>
							</a>
						</span>
						{/* instagram  */}
						<span>
							<a href='https://www.instagram.com/ikeakr/' target='_blank' title='새창-이케아 코리아 인스타그램'>
								<i class='fa-brands fa-square-instagram'></i>
							</a>
						</span>
						{/* blog  */}
						<span>
							<a href='https://lifeathome.ikea.com/blog/' target='_blank' title='새창-이케아 미국 블로그'>
								<i class='fa-solid fa-blog'></i>
							</a>
						</span>
					</p>
				</div>
				{/* right part  */}
				<div class='noticeWrap'></div>
			</div>
		</section>
	);
}

export default Notice;
