import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Context } from "../store/appContext";
import { message } from "antd";
import ScrollAnimation from "react-animate-on-scroll";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [inputFname, setFnameValue] = useState("");
	const [inputSname, setSnameValue] = useState("");
	const [inputEmail, setEmailValue] = useState("");
	const [inputPassword, setPasswordValue] = useState("");
	const [inputRpassword] = useState("");
	const [user, setUser] = useState(false);

	const handleSubmit = event => {
		let baseURL = process.env.BACKEND_URL + "/api/Register";

		let validURL = process.env.BACKEND_URL + "/api/ValidateEmail";

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var data = JSON.stringify({
			firstName: inputFname.toLowerCase(),
			lastName: inputSname.toLowerCase(),
			email: inputEmail.toLowerCase(),
			is_Active: true,
			password: inputPassword
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: data,
			redirect: "follow"
		};

		fetch(baseURL, requestOptions)
			.then(res => {
				if (res.status === 400) {
					message.error({
						content: "Todos los campos son requeridos"
					});
				} else if (res.status === 406) {
					message.error({
						content: "El correo ingresado ya existe"
					});
				} else if (res.status === 200) {
					return res.json();
				}
			})
			.then(result => {
				setUser(true);
			})
			.catch(error => console.log("error:", error));

		event.preventDefault();
	};
	if (user) {
		return (
			<div id="cardRegister" className="animated fadeIn">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<div id="upper-side">
						<i className="fa fa-check" />
						<h3 id="status"> Registro Existoso </h3>
					</div>
					<div id="lower-side">
						<p id="message">Su cuenta ha sido creada exitosamente</p>
						<Link to="/Login" id="contBtn">
							Continuar
						</Link>
					</div>
				</ScrollAnimation>
			</div>
		);
	} else {
		return (
			<section id="R1" className="container ">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base text-white">Unete a CryptoSmart Wallet</h2>
						<br />
					</div>
					<div id="R2" className="card-contact card border-5 border-white mw-100 mx-auto">
						<div id="R3" className="card-contact card mw-100 mx-auto">
							<article className="card-body mx-auto py-0">
								<form onSubmit={handleSubmit}>
									<div className="form-group input-group mb-0">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-user" />
											</span>
										</div>
										<input
											type="text"
											value={inputFname}
											placeholder="Nombre"
											onChange={e => setFnameValue(e.target.value)}
											className="form-control"
											required
										/>
									</div>

									<div className="form-group input-group mt-3 mb-0">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-user" />
											</span>
										</div>
										<input
											type="text"
											value={inputSname}
											placeholder="Apellido"
											onChange={e => setSnameValue(e.target.value)}
											className="form-control"
											required
										/>
									</div>

									<div className="form-group input-group mt-3 mb-0">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="far fa-envelope" />
											</span>
										</div>
										<input
											type="email"
											id="Email"
											value={inputEmail}
											onChange={e => setEmailValue(e.target.value)}
											placeholder="Correo"
											className="form-control"
											required
										/>
									</div>

									<div className="form-group input-group mt-3 mb-0">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-lock" />
											</span>
										</div>
										<input
											type="password"
											id="password"
											pattern=".{8,}"
											value={inputPassword}
											onChange={e => setPasswordValue(e.target.value)}
											placeholder="Contraseña"
											className="form-control"
											required
										/>
									</div>

									<div className="form-group text-center mt-3">
										<button
											id="Rbutton"
											className="btn btn-outline-primary text-font-base btn-block">
											Registrarse
										</button>
									</div>
									<div className="form-group text-center text-font-base">
										<p className="m-0 text-white">
											¿Ya estás registrado?
											<br />
											<Link to="/Login">Ingresa aquí</Link>
										</p>
									</div>
								</form>
							</article>
						</div>
					</div>
				</ScrollAnimation>
			</section>
		);
	}
};
