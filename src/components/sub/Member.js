import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Member() {
	const [Members, setMembers] = useState([]);
	console.log(Members);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			setMembers(data.data.members);
		});
	}, []);

	return (
		<Layout type={''} name1={'member'} name2={'디자이너'} video={'pexels.mp4'}>
			{Members.map((member, idx) => {
				return (
					<>
						<div className='membersBox' key={idx}>
							<div className='membersName'>
								<h1>{member.name}</h1>
								<h3>{member.sub}</h3>
							</div>
							<div className='membersImg'>
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							</div>
							<div className='membersDesc'>
								<p>{member.description}</p>
							</div>
						</div>
					</>
				);
			})}
		</Layout>
	);
}

export default Member;
