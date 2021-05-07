import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Context } from "../store/appContext";
import { message } from "antd";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [inputEmail, setEmailValue] = useState("");
	const [inputPassword, setPwdValue] = useState("");
	const [user, setUser] = useState(localStorage.getItem("user"));

	const handleSubmit = event => {
		let baseURL = process.env.BACKEND_URL + "/api/Login";
		var myHeaders = new Headers();
		let AuthHeader = "Basic " + window.btoa(inputEmail + ":" + inputPassword);
		myHeaders.append("Authorization", AuthHeader);

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		fetch(baseURL, requestOptions)
			.then(res => {
				if (res.status === 401) {
					message.error({
						content: "Correo o Contraseña incorrecta!",
						style: {
							marginTop: "20vh"
						}
					});
				} else if (res.status === 200) {
					return res.json();
				}
			})
			.then(result => {
				//console.log(result);
				if (result != undefined) {
					localStorage.setItem("user", JSON.stringify(result));
					setUser(localStorage.getItem("user"));
					actions.LoginStore();
				}
			})
			.catch(error => console.log("error:", error));

		event.preventDefault();
	};

	if (user != undefined) {
		return <Redirect to={{ pathname: "/Home" }} />;
	} else {
		return (
			<section id="R1" className="container ">
				<div className="text-center mt-3">
					<h2 className="mb-0 mt-3 text-font-base text-white">Ingresa a CryptoSmart Wallet</h2>
					<br />
				</div>
				<div id="R2" className="card-contact card border-5 border-white mw-100 mx-auto">
					<div id="R3login" className="card-contact card mw-100 mx-auto">
						<article className="card-body mx-auto py-0">
							<form onSubmit={handleSubmit}>
								<div className="form-group input-group mb-0">
									<div className="input-group-prepend">
										<span className="input-group-text">
											<i className="fas fa-user" />
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
											<i className="fas fa-user" />
										</span>
									</div>
									<input
										type="password"
										id="password"
										value={inputPassword}
										onChange={e => setPwdValue(e.target.value)}
										placeholder="Contraseña"
										className="form-control"
										required
									/>
								</div>

								<div className="form-group text-center mt-3">
									<button id="Rbutton" className="btn btn-outline-primary text-font-base btn-block">
										Iniciar sesión
									</button>
								</div>
								<div className="form-group text-center text-font-base">
									<p className="m-0 text-white">
										<Link to="/ForgotPassword">¿Olvidaste tu contraseña?</Link>
									</p>
								</div>
							</form>
						</article>
					</div>
				</div>
			</section>
		);
	}
};