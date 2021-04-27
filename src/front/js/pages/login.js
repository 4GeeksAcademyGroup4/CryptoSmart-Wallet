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
			<section className="container mw-90">
				<div className="card-contact card border-0 mw-100 mx-auto bg-light">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base">Acceso</h2>
						<p className="text-font-base">Bienvenido...</p>
					</div>
					<article className="card-body mx-auto py-0">
						<form className="" onSubmit={handleSubmit}>
							<div className="form-group input-group mb-0">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="far fa-user" />
									</span>
								</div>
								<input
									type="text"
									id="Email"
									value={inputEmail}
									placeholder="Email"
									onChange={e => setEmailValue(e.target.value)}
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
									onChange={e => setPwdValue(e.target.value)}
									placeholder="Contraseña"
									className="form-control"
									required
								/>
							</div>
							<div className="form-group text-center mt-3">
								<button className="btn btn-outline-primary text-font-base btn-block">Ingresar</button>
							</div>
							<div className="form-group text-center">
								<p className="m-0">
									<Link to="/Register" className="text-center text-font-base">
										(Registrarse como nuevo usuario)
									</Link>
								</p>
								<p className="m-0">
									<Link to="/ForgotPassword" className="text-center text-font-base">
										¿Olvido su contraseña?
									</Link>
								</p>
							</div>
						</form>
					</article>
				</div>
			</section>
		);
	}
};
