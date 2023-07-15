import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function Gallery() {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '08e2b5a2a14d18ff9a849c7109134194';
	const method_interest = 'flickr.interestingness.getList';
	const num = 20;
	const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;

	const [Items, setItems] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
	}, []);
	return (
		<Layout name1={'gallery'} name2={'갤러리'} video={'pexels.mp4'}>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
