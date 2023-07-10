function Visual() {
	const path = process.env.PUBLIC_URL;
	return (
		<section id='visual'>
			<img src={path + '/img/visual2.png'} alt='Main Kitchen' />
			<div className='visualWrap'>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'></div>

				{/* Main pointBox(text) */}
				<div className='bg'>
					Lorem <br />
					ipsum dolor sit
				</div>
				<div className='bg'>Lorem</div>
				<div className='bg'></div>
				<div className='bg'></div>
				<div className='bg'>
					<p>Lorem ipsum dolor sit amet.</p>
					<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, fuga? orem ipsum Lorem ipsum dolor sit amet consectetur</h1>
				</div>

				{/* Main pointBox2 (text)  */}
				<div className='bg on '>
					Lorem
					<br /> ipsum dolor sit
				</div>
				<div className='bg'></div>
				<div className='bg'></div>
			</div>
		</section>
	);
}

export default Visual;
