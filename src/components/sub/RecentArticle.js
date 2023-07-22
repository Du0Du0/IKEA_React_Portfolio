import { useEffect, useState } from 'react';

function RecentArticle() {
	const getRecentData = () => {
		const recentData = localStorage.getItem('recent');
		if (recentData) {
			return JSON.parse(recentData);
		}
	};

	const [Recent, setRecent] = useState(getRecentData());

	return (
		<aside>
			<div className='recentArticleWrap'>
				<div className='titWrap'>
					<h3>최근 본</h3>
					<button className='closeBtn'>X</button>
				</div>
				<p>전체 {Recent.length}</p>
				<div className='btnWrap'>
					<button className='prevBtn'>이전</button>
					<button className='nextBtn'>다음</button>
				</div>

				{Recent.map((recent, idx) => {
					if (idx >= 4) return null;
					return (
						<>
							<div className='recentArticle' key={idx}>
								<h4>{recent.title}</h4>
								<p>{recent.topic}</p>
							</div>
						</>
					);
				})}
			</div>
		</aside>
	);
}

export default RecentArticle;
