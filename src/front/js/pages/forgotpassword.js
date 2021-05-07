import React, { useState } from "react";
import { Link } from "react-router-dom";
import CryptoUsers from "../services/cryptouser";
import ScrollAnimation from "react-animate-on-scroll";

export const ForgotPassword = () => {
	const [InputEmail, setEmail] = useState("");
	const [SuccessMsg, setSuccessMsg] = useState(false);

	const CryptoUsersSVC = new CryptoUsers();

	const handleSubmit = event => {
		console.log(InputEmail);
		CryptoUsersSVC.ForgotPassword(InputEmail).then(res => {
			setSuccessMsg(true);
		});
		event.preventDefault();
	};
	if (SuccessMsg) {
		return (
			<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
				<section id="F1" className="container">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base text-white">RECUPERAR CONTRASEÑA</h2>
						<br />
					</div>
					<div id="F2" className="card-contact card border-5 border-white mw-100 mx-auto">
						<div id="F3" className="card-contact card mw-100 mx-auto">
							<article className="card-body mx-auto py-0">
								<h3 className="text-center text-font-base text-white font-weight-light mt-3">
									Su nueva contraseña fue generada exitosamente y enviada a su correo!!!
								</h3>
								<br />
								<div className="form-group text-center">
									<p className="m-0">
										<Link to="/Login" className="text-center text-font-base text-primary-color">
											Ingresar a su cuenta
										</Link>
									</p>
								</div>
							</article>
						</div>
					</div>
				</section>
			</ScrollAnimation>
		);
	} else {
		return (
			<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
				<section id="F1" className="container">
					<div className="text-center mt-3">
						<h2 className="mb-0 mt-3 text-font-base text-white">RECUPERAR CONTRASEÑA</h2>
						<br />
					</div>
					<div id="F2" className="card-contact card border-5 border-white mw-100 mx-auto">
						<div id="F3" className="card-contact card mw-100 mx-auto">
							<article className="card-body mx-auto py-0">
								<form onSubmit={handleSubmit}>
									<div className="form-group input-group mt-3 mb-0">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="far fa-envelope" />
											</span>
										</div>
										<input
											type="email"
											id="Email"
											value={InputEmail}
											onChange={e => setEmail(e.target.value)}
											placeholder="Correo"
											className="form-control"
											required
										/>
									</div>

									<div className="form-group text-center mt-3">
										<button
											id="Fbutton"
											className="btn btn-outline-primary text-font-base btn-block">
											GENERAR CONTRASEÑA
										</button>
									</div>
								</form>
							</article>
						</div>
					</div>
				</section>
			</ScrollAnimation>
		);
	}
};
