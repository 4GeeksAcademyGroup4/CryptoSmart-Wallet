import React, { useContext } from "react";
import { Context } from "../store/appContext";
import banner from "../../img/Banner1.jpg";
import banner1 from "../../img/Banner2.jpeg";
import banner2 from "../../img/Banner3.jpg";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import * as CryptoCharts from "cryptocharts";
import { Converter } from "../component/converter";

export const Landing = () => {
	const { store, actions } = useContext(Context);
	CryptoCharts.roiComparison({
		chart_id: "mychart",
		cryptocompare_tickers: ["BTC", "ETH"],
		iconomi_tickers: ["BLX", "CAR"],
		last_days: 90
	});
	return (
		<div className="text-center mt-5">
			<div className="container-fluid">
				<h1>Cree su cuenta, transfiera y reciba sus Crypto Monetadas a su convenencia</h1>

				<div className="bd-example">
					<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
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
									<p>
										Del mismo modo, una criptomoneda es una cadena de datos que indica una unidad.
									</p>
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
								<img src={banner2} className="d-block w-100" alt="..." />
								<div className="carousel-caption d-none d-md-block">
									<h5 className="bx-shadow">4GEEKS ACADEMY</h5>
									<p>GRUPO 4, aleguerrerom, hirolabpro jhomstone, Mivargasg </p>
								</div>
							</div>
						</div>
						<a
							className="carousel-control-prev"
							href="#carouselExampleCaptions"
							role="button"
							data-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true" />
							<span className="sr-only">Previous</span>
						</a>
						<a
							className="carousel-control-next"
							href="#carouselExampleCaptions"
							role="button"
							data-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true" />
							<span className="sr-only">Next</span>
						</a>
					</div>

					<div className="pt-2 pb-5">
						<h1>Consulte el cambio su Crypto Moneda favorita a tiempo real</h1>
						<Converter />
					</div>
					<div id="flip-container mb-5">
						<div className="row">
							<div className="col  py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col  py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col  py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="flip-container mb-5">
						<div className="row">
							<div className="col py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col py-2">
								<div className="flip-box">
									<div className="flip-box-inner">
										<div className="flip-box-front" />
										<div className="flip-box-back">
											<h2>Paris</h2>
											<p>What an amazing city</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="mychart" />

					<TradingViewWidget symbol="BTCUSD" theme={Themes.DARK} locale="es" autosize />
				</div>
			</div>
		</div>
	);
};
