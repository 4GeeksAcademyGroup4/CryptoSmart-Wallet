import React, { Component } from "react";
import banner from "../../img/Banner1.jpg";
import banner1 from "../../img/Banner2.jpeg";
import banner2 from "../../img/Banner3.jpg";

export const Corousel = () => (
	<div>
		<div className="bd-example carrousel">
			<div id="carouselExampleCaptions" className="carousel slide border" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleCaptions" data-slide-to="0" className="active" />
					<li data-target="#carouselExampleCaptions" data-slide-to="1" />
					<li data-target="#carouselExampleCaptions" data-slide-to="2" />
				</ol>
				<div className="carousel-inner bx-shadow">
					<div className="carousel-item active">
						<img src={banner} className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5 className="bx-shadow">LA MONEDA DEL FUTURO</h5>
							<p>Del mismo modo, una criptomoneda es una cadena de datos que indica una unidad.</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src={banner1} className="d-block w-100" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5 className="bx-shadow">TRANSFIERA CRYPTOMONEDAS</h5>
							<p>
								Consiste en una clave criptográfica que se asocia a un monedero virtual, el cual
								descuenta y recibe pagos.{" "}
							</p>
						</div>
					</div>
					<div className="carousel-item">
						<img src={banner2} className="d-block w-100 border" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5 className="bx-shadow">4GEEKS ACADEMY</h5>
							<p>GRUPO 4, aleguerrerom, hirolabpro jhomstone, Mivargasg </p>
						</div>
					</div>
				</div>
				<a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true" />
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true" />
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	</div>
);
