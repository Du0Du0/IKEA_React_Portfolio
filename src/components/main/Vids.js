import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Vids() {
	return (
		<section id='vids' class='myScroll'>
			<div class='vidsContainer'>
				<div class='vidsTextWrap'>
					{/* video page title  */}
					<div class='vidsTit'>
						<h2>비디오</h2>
					</div>
					{/* video page description  */}
					<div class='vidsSub'>
						Lorem ipsum dolor sit amet consectetur <strong>adipisicing</strong> elit. Atque,
						<strong>suscipit?</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit?Lorem ipsu
					</div>
				</div>
				{/* video list start  */}
				<div class='vidsVideoWrap'></div>
				{/* video "see more video" button  */}
				<p>
					<a href='video.html'>
						바로가기 &nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon icon={faArrowRight} />
					</a>
				</p>
			</div>
		</section>
	);
}

export default Vids;
