import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import LayoutNone from '../common/LayoutNone';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Mongo() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		axios.post('/api/read').then((res) => {
			console.log(res);
			setPosts(res.data.communityList);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title>몽고테스트</title>
			</Helmet>
			<LayoutNone type={''} name1={'mongos'}>
				{Posts.map((post) => {
					return (
						<article key={post._id}>
							<h2>{post.title}</h2>
						</article>
					);
				})}
			</LayoutNone>
		</>
	);
}

export default Mongo;
