import React from "react";
import jairo from "../../img/jairo.png";
import ale from "../../img/aleguerrerom.png";
import john from "../../img/johnstone.png";
import miguel from "../../img/miguel.png";
import { Image } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";

export const About = () => {
	return (
		<div className="jumbotron bg-pcolor mb-1">
			<div className=" jumbotron bg-light">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<h1>Acerca de</h1>
					<h2>Crypto Smart Wallet fue Desarrolado por:</h2>
				</ScrollAnimation>
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="flip-box-ab p-1  text-light">
								<div className="flip-box-inner">
									<div className="flip-box-front">
										<Image src={jairo} className="w-100 p-3 mw-100 mh-100" roundedCircle />
									</div>
									<div className="flip-box-back mx-2 text-light">
										<h3 className="text-light">Jairo Castro</h3>
										<p>Full Stack Web deveoper</p>
										<p>hirolabpro</p>
										<h3 className="text-light">San Jose</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="flip-box-ab p-1  text-light">
								<div className="flip-box-inner">
									<div className="flip-box-front">
										<Image src={john} className="w-100 p-3 mw-100 mh-100" roundedCircle />
									</div>
									<div className="flip-box-back mx-2 text-light">
										<h3 className="text-light">Jonathan Piedra</h3>
										<p>Full Stack Web deveoper</p>
										<p>johmstone</p>
										<h3 className="text-light">Alajuela</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<div className="flip-box-ab p-1  text-light">
								<div className="flip-box-inner">
									<div className="flip-box-front">
										<Image src={ale} className="w-100 p-3 mw-100 mh-100" roundedCircle />
									</div>
									<div className="flip-box-back mx-2 text-light">
										<h3 className="text-light">Alejandro Guerrero</h3>
										<p>Full Stack Web deveoper</p>
										<p>aleguerrerom</p>
										<h3 className="text-light">Tres rios</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="flip-box-ab p-1 text-light">
								<div className="flip-box-inner">
									<div className="flip-box-front">
										<Image src={miguel} className="w-100 p-3 mw-100 mh-100" roundedCircle />
									</div>
									<div className="flip-box-back mx-2 text-light">
										<h3 className="text-light">Miguel Vargas</h3>
										<p>Full Stack Web deveoper</p>
										<p>Mivargasg</p>
										<h3 className="text-light">Heredia</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
