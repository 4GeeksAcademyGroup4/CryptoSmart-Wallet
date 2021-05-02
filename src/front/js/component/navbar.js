import React, { useContext, setState, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO from "../../img/LOGO.png";
import USERIMG from "../../img/userimg.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const { isOpen, qfalse } = useState(false);
	const Nombre = "Ale";

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
				<Link to="/AboutUs" className="nav-item nav-link text-primary-color">
					ACERCA DE
				</Link>
				<Link to="/DondeComprar" className="nav-item nav-link text-primary-color">
					DONDE COMPRAR
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
				<Link to="/DondeComprar" className="nav-item nav-link text-primary-color">
					DONDE COMPRAR
				</Link>

				<div className="ml-auto">
					<img className="userimg img-fluid mx-5" src={USERIMG} style={{ height: 70 }} />

					<button className="btn btn-primary btn-primary-color" onClick={() => Logout()}>
						Salir
					</button>
				</div>
			</nav>
		);
	}
};
