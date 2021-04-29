import React from "react";

export const ForgotPassword = () => {
	return (
		<section id="F1" className="container">
			<div className="text-center mt-3">
				<h2 className="mb-0 mt-3 text-font-base text-white">RECUPERAR CONTRASEÑA</h2>
				<br />
			</div>
			<div id="F2" className="card-contact card border-5 border-white mw-100 mx-auto">
				<div id="F3" className="card-contact card mw-100 mx-auto">
					<article className="card-body mx-auto py-0">
						<form>
							<div className="form-group input-group mt-3 mb-0">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="far fa-envelope" />
									</span>
								</div>
								<input type="email" id="Email" placeholder="Correo" className="form-control" required />
							</div>

							<div className="form-group text-center mt-3">
								<button id="Rbutton" className="btn btn-outline-primary text-font-base btn-block">
									GENERAR CONTRASEÑA
								</button>
							</div>
						</form>
					</article>
				</div>
			</div>
		</section>
	);
};
