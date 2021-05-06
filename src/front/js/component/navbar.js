import React, { useContext, setState, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO from "../../img/LOGO.png";
import USERIMG from "../../img/userimg.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const { isOpen, qfalse } = useState(false);
	const currentuser = { firstname: "Alejandro", lastName: "Guerrero" };
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
					<div id="flip-container-usr mb-5">
						<div className="row">
							<div className="flip-box-usr p-1 text-light">
								<div className="flip-box-inner">
									<div className="flip-box-front">
										<img className="userimg img-fluid" src={USERIMG} style={{ height: 70 }} />
									</div>
									<div className="flip-box-back text-light">
										<p className="text-light mt-3">
											{currentuser.firstname + " " + currentuser.lastName}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<button className="btn btn-primary btn-primary-color" onClick={() => Logout()}>
								Salir
							</button>
						</div>
					</div>
				</div>
			</nav>
		);
	}
};
