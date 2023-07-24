function TopButton() {
	const goToTopBtn = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<>
			<button className='goTopBtn w' onClick={goToTopBtn}>
				Go Top
			</button>
		</>
	);
}

export default TopButton;
