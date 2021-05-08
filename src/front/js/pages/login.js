import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { message } from "antd";
import ScrollAnimation from "react-animate-on-scroll";

import CryptoUsers from "../services/cryptouser";

export const Register = () => {
	const [inputFname, setFnameValue] = useState("");
	const [inputSname, setSnameValue] = useState("");
	const [inputEmail, setEmailValue] = useState("");
	const [inputPassword, setPasswordValue] = useState("");
	const [user, setUser] = useState(false);
	const CryptoUsersSVC = new CryptoUsers();

	const handleSubmit = event => {
		CryptoUsersSVC.ValidateEmail(inputEmail).then(res => {
			if (res.StatusID === 406) {
				message.error({
					content: "Este email ya se encuentra registrado!!!",
					style: {
						marginTop: "30vh"
					}
				});
			}
			if (res.StatusID === 411) {
				message.error({
					content: "Este email es invalido!!!",
					style: {
						marginTop: "30vh"
					}
				});
			} else {
				let model = {
					FName: inputFname,
					LName: inputSname,
					Email: inputEmail,
					Password: inputPassword
				};
				CryptoUsersSVC.Register(model).then(res2 => {
					if (res2.StatusID) {
						message.error({
							content: res.msg,
							style: {
								marginTop: "30vh"
							}
						});
					} else {
						setUser(true);
					}
				});
			}
		});

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
			<section id="R1" className="container my-5 p-3">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base text-white">Unete a CryptoSmart Wallet</h2>
						<br />
					</div>
					<div id="R2" className="card-contact card border-5 border-white mw-100 mx-auto">
						<div id="R3" className="card-contact card mw-100 mx-auto">
							<article className="card-body mx-auto pt-5 pb-2">
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
