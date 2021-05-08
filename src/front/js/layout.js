import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Particles from "react-particles-js";

import { Landing } from "./pages/landing";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotpassword";
import { About } from "./pages/aboutus";
import { DondeComprar } from "./pages/comprar";

import injectContext from "./store/appContext";
import { History } from "./pages/history";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<Particles
					id="tsparticles"
					width="100%"
					height="100%"
					params={{
						background: {
							color: {
								value: "#fffff"
							}
						},
						fpsLimit: 60,
						interactivity: {
							detectsOn: "canvas",
							events: {
								onClick: {
									enable: true,
									mode: "push"
								},
								onHover: {
									enable: true,
									mode: "repulse"
								},
								resize: true
							},
							modes: {
								bubble: {
									distance: 400,
									duration: 2,
									opacity: 0.8,
									size: 40
								},
								push: {
									quantity: 4
								},
								repulse: {
									distance: 200,
									duration: 0.4
								}
							}
						},
						particles: {
							color: {
								value: "#041427"
							},
							links: {
								color: "#56CCF2",
								distance: 150,
								enable: true,
								opacity: 0.5,
								width: 1
							},
							collisions: {
								enable: true
							},
							move: {
								direction: "none",
								enable: true,
								outMode: "bounce",
								random: false,
								speed: 6,
								straight: false
							},
							number: {
								density: {
									enable: true,
									value_area: 800
								},
								value: 80
							},
							opacity: {
								value: 0.5
							},
							shape: {
								type: "circle"
							},
							size: {
								random: true,
								value: 5
							}
						},
						detectRetina: true
					}}
				/>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Landing />
						</Route>
						<Route exact path="/History/:accountID">
							<History />
						</Route>
						<Route exact path="/Login">
							<Login />
						</Route>
						<Route exact path="/Home">
							<Home />
						</Route>
						<Route exact path="/Register">
							<Register />
						</Route>
						<Route exact path="/ForgotPassword">
							<ForgotPassword />
						</Route>
						<Route exact path="/AboutUs">
							<About />
						</Route>
						<Route exact path="/DondeComprar">
							<DondeComprar />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
