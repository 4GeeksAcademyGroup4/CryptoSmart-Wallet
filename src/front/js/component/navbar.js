import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const Logout = () => {
		localStorage.removeItem("user");
		actions.LogoutStore();
	};
	if (!store.isLogged) {
		return (
			<nav className="navbar navbar-light bg-light mb-3">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/Register">
						<span className="mx-3">Registrarse</span>
					</Link>
					<Link to="/Login">
						<button className="btn btn-primary">Accessar</button>
					</Link>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-light bg-light mb-3">
				<Link to="/Home">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<button className="btn btn-primary" onClick={() => Logout()}>
						Salir
					</button>
				</div>
			</nav>
		);
	}
};
