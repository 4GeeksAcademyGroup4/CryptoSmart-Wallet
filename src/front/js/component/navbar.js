import React, { useContext, setState, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO from "../../img/LOGO.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const Currentuser = JSON.parse(localStorage.getItem("user"));
	let history = useHistory();

	const Logout = () => {
		localStorage.removeItem("user");
		actions.LogoutStore();
		history.push("/");
	};

	if (!store.isLogged) {
		return (
			<nav className="navbar navbar-expand-lg">
				<Link to="/" className="navbar-brand">
					<img className="img-fluid" src={LOGO} style={{ height: 80 }} />
				</Link>
				<button
					className="navbar-toggler btn btn-primary btn-primary-color"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<i className="fas fa-bars tx-white fa-15x" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="/AboutUs" className="nav-link">
								ACERCA DE
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/DondeComprar" className="nav-link">
								DONDE COMPRAR
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to="/Register" className="nav-link">
								Registrarse
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/Login">
								<button className="btn btn-primary btn-primary-color fa-125x">Accesar</button>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-expand-lg">
				<Link to="/Home" className="navbar-brand">
					<img className="img-fluid" src={LOGO} style={{ height: 80 }} />
				</Link>
				<button
					className="navbar-toggler btn btn-primary btn-primary-color"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<i className="fas fa-bars tx-white fa-15x" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/DondeComprar" className="nav-link">
								DONDE COMPRAR
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<span className="nav-link fa-125x text-capitalize">Hola {Currentuser.firstname}</span>
						</li>
						<li className="nav-item">
							<button className="btn btn-primary btn-primary-color fa-125x" onClick={() => Logout()}>
								Salir
							</button>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
};
