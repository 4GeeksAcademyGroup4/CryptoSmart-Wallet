import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Context } from "../store/appContext";
import { message } from "antd";

import CryptoUsers from "../services/cryptouser";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [inputEmail, setEmailValue] = useState("");
	const [inputPassword, setPwdValue] = useState("");
	const CryptoUsersSVC = new CryptoUsers();

	const handleSubmit = event => {
		let model = {
			email: inputEmail,
			password: inputPassword
		};
		CryptoUsersSVC.Login(model).then(res => {
			if (res.StatusID) {
				message.error({
					content: res.msg,
					style: {
						marginTop: "30vh"
					}
				});
			} else {
				localStorage.setItem("user", JSON.stringify(res));
				actions.LoginStore();
			}
		});
		event.preventDefault();
	};

	if (store.isLogged) {
		return <Redirect to={{ pathname: "/Home" }} />;
	} else {
		return (
			<section id="R1" className="container my-5 p-3">
				<div className="text-center mt-3">
					<h2 className="mb-0 mt-3 text-font-base text-white">Ingresa a CryptoSmart Wallet</h2>
					<br />
				</div>
				<div id="R2" className="card-contact card border-5 border-white mw-100 mx-auto">
					<div id="R3login" className="card-contact card mw-100 mx-auto">
						<article className="card-body mx-auto pt-5 pb-3">
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
											<i className="fas fa-key" />
										</span>
									</div>
									<input
										type="password"
										id="password"
										value={inputPassword}
										onChange={e => setPwdValue(e.target.value)}
										placeholder="Contrase??a"
										className="form-control"
										required
									/>
								</div>

								<div className="form-group text-center mt-3">
									<button id="Rbutton" className="btn btn-outline-primary text-font-base btn-block">
										Iniciar sesi??n
									</button>
								</div>
								<div className="form-group text-center text-font-base">
									<p className="m-0 text-white">
										<Link to="/ForgotPassword">??Olvidaste tu contrase??a?</Link>
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
