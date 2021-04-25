import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../img/LOGO.png";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<a className="navbar-brand" href="#">
				<Link to="/">
					<p>
						<img className="img-fluid" src={LOGO} style={{ height: 80 }} />
					</p>
				</Link>
			</a>
			<Link to="/">
				<a className="nav-item nav-link active text-light" href="#">
					INICIO <span className="sr-only">(current)</span>
				</a>
			</Link>
			<Link to="/">
				<a className="nav-item nav-link text-light" href="#">
					ACERCA DE
				</a>
			</Link>
			<Link to="/">
				<a className="nav-item nav-link text-light" href="#">
					PRICING
				</a>
			</Link>

			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary text-light font-weight-bold">LOG IN</button>
				</Link>
			</div>
		</nav>
	);
};
