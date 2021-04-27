import React from "react";

export const ForgotPassword = () => {
	return (
		<div className="container">
			<h2>RECUPERACIÓN DE CONTRASEÑA</h2>

			<article className="card-body mx-auto py-0">
				<div className="jumbotron">
					<div className="mb-5 row">
						<div className="col-sm-12">
							<input type="password" className="form-control" id="inputPassword" />
						</div>
					</div>
					<div className="mb-5 row">
						<div className="col-sm-12">
							<button type="button" className="btn btn-secondary">
								GENERAR CONTRASEÑA
							</button>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
};
