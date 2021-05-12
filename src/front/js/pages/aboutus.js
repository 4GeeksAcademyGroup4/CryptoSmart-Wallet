import React from "react";
import jairo from "../../img/jairo.png";
import ale from "../../img/aleguerrerom.png";
import john from "../../img/johnstone.png";
import miguel from "../../img/miguel.png";
import { Image } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-router-dom";

export const About = () => {
	let DevTeam = [
		{
			Nombre: "Jairo Castro Villalobos",
			Titulo: "Full Stack Developer",
			Puesto: "Senior Network Engineer, Security & Cloud",
			GitHubUser: "Hirolabpro",
			Ubicacion: "San José, CR",
			image: jairo
		},
		{
			Nombre: "Jonathan Piedra Céspedes",
			Titulo: "Full Stack Developer",
			Puesto: "Application Developer Arquitect",
			GitHubUser: "Johmstone",
			Ubicacion: "Alajuela, CR",
			image: john
		},
		{
			Nombre: "Alejandro Guerrero Madrigal",
			Titulo: "Full Stack Developer",
			Puesto: "Telecommunications Technician, Networking & Security",
			GitHubUser: "Aleguerrerom",
			Ubicacion: "Tres Rios, CR",
			image: ale
		},
		{
			Nombre: "Miguel Vargas González",
			Titulo: "Full Stack Developer",
			Puesto: "Jefe de Cadena de Suministros",
			GitHubUser: "Mivargasg",
			Ubicacion: "Heredia, CR",
			image: miguel
		}
	];

	return (
		<div>
			<div className="container-fluid m-5">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<h1>CryptoSmart Wallet</h1>
					<div className="container bg-white-50">
						<p className="fa-15x text-justify">
							CryptoSmart Wallet es una plataforma que nos permita llevar el control de nuestras
							criptomonedas, llámese saldos, balances, transferencias, ajustes, etc. Además de brindar una
							plataforma que permita la transferencia sin intermediaros y con usuarios debidamente
							registrados, lo que a su vez incremente la confianza e impulse a las personas a manejar sus
							activos con nuestra aplicación.
						</p>
						<p className="fa-15x text-justify">
							El mercado de las crypto monedas ha crecido exponencialmente en los últimos años y a pesar
							de la volatibilidad del mercado, se ha convertido en un método de pago aceptado por muchos
							comercios y se espera que sea la moneda del futuro. Es por esta razón que existe una demanda
							latente de aplicaciones que permitan el control y el manejo de estas monedas.
						</p>
					</div>
					<h2>Equipo Desarrollador:</h2>
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<div className="container">
						<div className="row row-cols-2">
							{DevTeam.map((item, i) => {
								return (
									<div className="col-xl-6" key={i}>
										<div className="flip-box-ab p-1 text-light">
											<div className="flip-box-inner">
												<div className="flip-box-front">
													<Image
														src={item.image}
														className="w-100 p-3 mw-100 mh-100"
														roundedCircle
													/>
												</div>
												<div className="flip-box-back mx-2 text-light">
													<h3 className="text-light mt-4">{item.Nombre}</h3>
													<p className="m-0">{item.Titulo}</p>
													<p className="m-0">{item.Puesto}</p>
													<a
														href={"https://github.com/" + item.GitHubUser}
														target="_blank"
														rel="noopener noreferrer"
														className="text-white">
														<i className="fab fa-github mr-2" />
														{item.GitHubUser}
													</a>
													<h4 className="text-light mt-3">{item.Ubicacion}</h4>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</ScrollAnimation>
			</div>
		</div>
	);
};
