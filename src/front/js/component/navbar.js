import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO from "../../img/LOGO.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const Logout = () => {
		localStorage.removeItem("user");
		actions.LogoutStore();
	};
	if (!store.isLogged) {
		return (
			<nav className="navbar mb-3">
				<Link to="/">
					<img className="img-fluid" src={LOGO} style={{ height: 80 }} />
				</Link>
				<Link to="/" className="nav-item nav-link text-primary-color">
					ACERCA DE
				</Link>
				<Link to="/" className="nav-item nav-link text-primary-color">
					PRICING
				</Link>
				<div className="ml-auto">
					<Link to="/Register">
						<span className="mx-3 text-primary-color">Registrarse</span>
					</Link>
					<Link to="/Login">
						<button className="btn btn-primary btn-primary-color">Accessar</button>
					</Link>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar mb-3">
				<Link to="/Home">
					<img className="img-fluid" src={LOGO} style={{ height: 80 }} />
				</Link>
				<div className="ml-auto">
					<button className="btn btn-primary btn-primary-color" onClick={() => Logout()}>
						Salir
					</button>
				</div>
			</nav>
		);
	}
};
