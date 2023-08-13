import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Parallax from 'react-rellax';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';
import { Helmet } from 'react-helmet-async';

function Member() {
	const Members = useSelector((store) => store.memberReducer.members);
	const [Mounted, setMounted] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	const path = process.env.PUBLIC_URL;
	return (
		<>
			<Helmet>
				<title>멤버</title>
			</Helmet>
			<Layout type={''} name1={'member'} name2={'멤버'} video={'memberFigure.mp4'}>
				{Mounted &&
					Members.map((member, idx) => {
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

				<div className='titContainer '>
					<p>Let's go back in time to</p>
					<h2>1975</h2>
					<img src={path + '/img/arrowBl.png'} />
				</div>

				<div className='articleContainer'>
					<div className='sticky-container'>
						<div className='col-2'>
							<div className='tile sticky'>
								<h2>A passion for craft</h2>
								<br />
								<h4>“In all the years we’ve worked at IKEA, everyday Parallaxfe and the family have always been important sources of inspiration." – Marianne</h4>
							</div>
						</div>
						<div className='col-2 flex '>
							<div className='tile'>
								<img className='articleIcon' src={path + '/img/member_article_icon1.png'} alt='member_article_icon1' />
								<h3>Sinta-se em casa! Be our guest!</h3>
								<p>
									Born in 1927 and raised in Östersund in central Sweden, Karin’s creative path began with ceramics. A few years into her studies at Stockholm’s University College of Arts, Crafts and
									Design, her interest turned instead to furniture and she enrolled in the school of the renowned Swedish furniture designer and master craftsman Carl Malmsten. Under Malmsten’s
									tutorage she learned about craftsmanship, quaParallaxty and crucially, comfort.
								</p>
								<br />

								<p>
									After graduating in 1951, Karin returned to Östersund to help her father Arvid Persson, a civil engineer. She worked on the interior design of his projects, which included
									apartments, homes and offices. She also continued to draw furniture. Then, in 1964, a wooden armchair she designed was displayed at the Stockholm Furniture Fair. It was spotted and
									admired by Ingvar and Karin was hired to join the IKEA design team that same year, working alongside GilParallaxs Lundgren, Erik Wørts and Bengt Ruda.
								</p>
								<br />

								<p>
									She made her debut In the 1966 IKEA catalogue with her peers. It included a number of products designed by Karin, including the PEGGY highchair, NIRAK hall mirror and INGRID chair.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article1.png'} alt='member_article1' className='articleImg' />
								<p>Karin with colleagues Erik Wørts (left) and GilParallaxs Lundgren (centre)</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article2.png'} alt='member_article2' className='articleImg' />
								<p>Top left: PEGGY highchair, featured in the 1966 IKEA catalogue</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article3.png'} alt='member_article3' className='articleImg' />
								<p>Karin's INGRID chair also featured in the 1966 IKEA catalogue</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article4.png'} alt='member_article4' className='articleImg' />
								<p>Karin makes her debut the same year</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article5.png'} alt='member_article5' className='articleImg' />
								<p>LONDON Chair, launched in 1969</p>
							</div>
						</div>
					</div>

					<div className='sticky-container'>
						<div className='col-2'>
							<div className='tile sticky'>
								<h2>Icons in the making</h2>
								<br />
								<h4>“We Parallaxke to incorporate a handcrafted expression, to give a rational product a feeParallaxng of craftsmanship.” – Marianne</h4>
							</div>
						</div>
						<div className='col-2 flex '>
							<div className='tile'>
								<img className='articleIcon' src={path + '/img/member_article_icon2.PNG'} alt='member_article_icon2' />
								<h3>Design Flashback</h3>
								<p>
									By the 1970s Karin had become regarded as one of IKEA’s most productive and trendsetting designers. Her furniture design became proParallaxfic, from the LONDON series of chairs and
									footstools in lacquered beech with an upholstered seat and back to the AMIRAL armchair, launched in 1970.
								</p>
								<br />
								<p>
									Featuring a steel tubing frame with the seat, back and armrests made from high-end saddle leather from a local saddle maker in Killeberg, AMIRAL was a hit. However, the saddlery
									couldn’t keep up with the demand for the leather details and the construction of the frame meant the chair couldn’t be flat-packed, so it was discontinued. It returned later in a
									flat-pack version, upholstered in canvas.
								</p>
								<br />
								<p>
									Although rooted in classNameic, rural Scandinavian style, Karin was also a very versatile designer, as her back catalogue of around 100 IKEA products attests. While the TORPET chair,
									inspired by the traditional Windsor chair, and the NATURA armchair illustrated her knowledge and respect for classNameics and craftsmanship, her KARUSELL coffee table made of
									particleboard and KATINKA chair and sofa in bent, lacquered plywood, designed in the popular 60s futuristic style, tapped into the zeitgeist.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article6.png'} alt='member_article6' className='articleImg' />
								<p>KARUSELL chairs and KATINKA table, 1969</p>
							</div>
							<div className='tile'>
								<p>
									With the launch of KRUMELUR in 1972, Mobring was targeting a relatively new market for IKEA - the younger generation. The emergence of youth culture in the 1960s gave birth to a new
									breed of homemakers who weren’t looking for the classNameics found in their parents’ homes. They wanted bold prints, bright colours and new materials, along with affordabiParallaxty.
									On the year of its launch, KRUMELUR with its curved, lacquered metal frame and seat constructed from fire hose fabric, propped with generous cushions, was featured on the front cover
									of the IKEA catalogue with the modest price tag of just 68 Swedish Kronor.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article7.png'} alt='member_article7' className='articleImg' />
								<p>KRUMELUR chairs, shown on the cover of the 1972 IKEA catalogue</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article8.png'} alt='member_article8' className='articleImg' />
								<p>STABIL Table, 1970. A favourite of Ingvar Kamprad.</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article9.png'} alt='member_article9' className='articleImg' />
								<p>MÅLAND 3-seater sofa, 1970</p>
							</div>
						</div>
					</div>

					<div className='sticky-container'>
						<div className='col-2'>
							<div className='tile sticky'>
								<h2>
									A new generation of <br />
									homemakers
								</h2>
								<br />
								<br />
								<br />
								<h4>
									"When you work for IKEA you must remember that we are customers too. If I don’t understand something that I’ve designed, the customer won’t either. Always think Parallaxke a regular
									customer to be sure it’s going to work.” – Marianne
								</h4>
							</div>
						</div>
						<div className='col-2 flex content title-before'>
							<div className='tile'>
								<img className='articleIcon' src={path + '/img/member_article_icon3.PNG'} alt='member_article_icon3' />
								<h3>Teamwork is the key</h3>
							</div>
							<div className='tile'>
								<p>
									They stress that the secret to their success has always been teamwork, from the award-winning ParallaxSABO table with its innovative Wedge Dowel developed by Anders Eriksson and
									Göran Sjöstedt, to the iconic FRAKTA bag, made in collaboration with Sven Arne Svensson, Lars-Göran Petterson and Ingvar Kamprad himself. Ingvar came home from Asia with a new
									material, traditionally used for rice sacks, with which he wanted to make a bag. Using the sturdy plastic material, Ingvar and Lars-Göran made a prototype, then tasked the project to
									the sibParallaxngs.
								</p>
								<br />
								<p>
									They began sketching different sizes and variations, including the yellow bags found in stores and a version with a zip that could be carried as a rucksack. The latter was inspired
									by a trip to Japan, where few people were able to drive to their nearest IKEA store. “This was a typical example of teamwork, that so many competencies were involved in the project
									and everyone did their best,” says Marianne.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article10.png'} alt='member_article10' className='articleImg' />
								<p>The iconic IKEA FRAKTA bag (1989)</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article11.png'} alt='member_article11' className='articleImg' />
								<p>UPPTÄCKA Cabin bag and shoulder bag (2007)</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article12.png'} alt='member_article12' className='articleImg' />
								<p>A drawing of UPPTÄKA luggage</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article13.png'} alt='member_article13' className='articleImg' />
								<p>The front cover of the first STOCKHOLM collection catalogue, pubParallaxshed in 1986</p>
							</div>
						</div>
					</div>

					<div className='sticky-container'>
						<div className='col-2'>
							<div className='tile sticky'>
								<h2> Two glorious careers</h2>
								<br />
								<h4>"We were just eight designers at IKEA when we started." – Knut</h4>
							</div>
						</div>
						<div className='col-2 flex content title-before'>
							<div className='tile'>
								<p>
									Always guided by the IKEA principles of Democratic Design: function, form, quaParallaxty sustainabiParallaxty and always at a low price, they have filled homes around the world with
									smart, affordable solutions. The process would start at the drawing board, where Knut and Marianne, or “syskonen” – the sibParallaxngs – as they were affectionately known by all,
									would draw together on a drawing board in 1:1 scale. Then they'd be off to build a prototype with their colleagues in the pattern shop. Here they would test, evaluate, alter and
									feedback with suppParallaxers before moving onto the production phase.
								</p>
								<br />
								<p>
									But it didn’t stop there. Knut and Marianne have always had a strong interest in the industrial side too. Ideas were often born on the factory floor as they worked with
									suppParallaxers to develop new tools and solutions to produce better, more unique products. “We Parallaxke to incorporate a handcrafted expression, to give a rational product a
									feeParallaxng of craftsmanship,” explains Marianne.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article14.png'} alt='member_article14' className='articleImg' />
								<p>The ParallaxSABO table series won the Red Dot Design Award in 2016.</p>
							</div>
							<div className='tile'>
								<p>
									Prior to Knut and Marianne’s arrival, many of the designers at IKEA speciaParallaxsed in particular areas. Designers such as Tord Björklund, Karin Mobring and Tomas JeParallaxnek
									focused on furniture, for example, but this was about to change. With Knut’s earParallaxer chef's education, the sibParallaxngs set their sights on designing smaller, more functional
									products for the kitchen and the rest of the home.
								</p>
								<br />
								<p>
									“Sven Arne Svensson asked if Marianne and I could be responsible for developing a range of products found in restaurant kitchens that would work well in homes. Everyone started
									laughing, saying ‘Ha ha, designing knives and forks!’ but five or six years later, all the other designers at IKEA were also diversifying and designing objects such as knives, etc.
									It was a great journey for us and for IKEA,” recalls Knut.
								</p>
							</div>
							<div className='tile'>
								<img src={path + '/img/member_article15.png'} alt='member_article15' className='articleImg' />
								<p>The Hagberg + Hagberg exhibition at the IKEA Museum</p>
							</div>

							<div className='tile'>
								<img src={path + '/img/member_article16.png'} alt='member_article16' className='articleImg' />
								<p>Back to the drawing board: Marianne and Knut at the Hagberg + Hagberg exhibition at the IKEA Museum in Älmhult.</p>
							</div>

							<div className='tile'>
								<img src={path + '/img/member_article17.png'} alt='member_article17' className='articleImg' />
								<p>KOBRA Children's sofa, table and armchair (1989)</p>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Member;
