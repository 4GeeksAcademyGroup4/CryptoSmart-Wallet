import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Context } from "../store/appContext";
import { message } from "antd";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [inputFname, setFnameValue] = useState("");
	const [inputSname, setSnameValue] = useState("");
	const [inputEmail, setEmailValue] = useState("");
	const [inputPassword, setPasswordValue] = useState("");
	const [user, setUser] = useState(false);

	const handleSubmit = event => {
		let baseURL = process.env.BACKEND_URL + "/api/Register";

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
				console.log(result);
				setUser(true);
			})
			.catch(error => console.log("error:", error));

		event.preventDefault();
	};

	if (user) {
		return (
			<section className="container mw-90">
				<div className="card-contact card border-0 mw-100 mx-auto bg-transparent">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base">Su registro fue exitoso</h2>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section className="container mw-90">
				<div className="card-contact card border-0 mw-100 mx-auto bg-transparent">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base">Crea un nuevo usuario</h2>
						<br />
					</div>
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
									id="Password"
									value={inputPassword}
									onChange={e => setPasswordValue(e.target.value)}
									placeholder="Contraseña"
									className="form-control"
									required
								/>
							</div>

							<div className="form-group text-center mt-3">
								<button className="btn btn-outline-primary text-font-base btn-block">
									Registrarse
								</button>
							</div>
							<div className="form-group text-center text-font-base">
								<p className="m-0">
									¿Ya estás registrado?
									<br />
									<Link to="/Login">Ingresa aquí</Link>
								</p>
							</div>
						</form>
					</article>
				</div>
			</section>
		);
	}
};
