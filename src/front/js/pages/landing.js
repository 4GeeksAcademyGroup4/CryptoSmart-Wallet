import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import * as CryptoCharts from "cryptocharts";
import { Converter } from "../component/converter";
import { FlipCard } from "../component/flipcard";
import { Corousel } from "../component/carousel";
import ScrollAnimation from "react-animate-on-scroll";

export const Landing = () => {
	const { store, actions } = useContext(Context);
	CryptoCharts.roiComparison({
		chart_id: "mychart",
		cryptocompare_tickers: ["BTC", "ETH"],
		iconomi_tickers: ["BLX", "CAR"],
		last_days: 15
	});

	useEffect(() => {
		actions.getTop5();
	}, []);

	return (
		<div className="text-center mt-5">
			<div className="container-fluid">
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<h1 className="class-that-animates bg-white-50">
						Cree su cuenta, transfiera y reciba sus Crypto Monetadas a su convenencia
					</h1>
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
					<Corousel />
				</ScrollAnimation>
				<div id="flip-container" className="mt-5">
					<ScrollAnimation animateIn="fadeIn" duration="1" animateOnce="true">
						<h1 className="bg-white-50">El top 6 de Crypto Monedas</h1>
					</ScrollAnimation>
					<ScrollAnimation animateIn="fadeIn" duration="2" animateOnce="true">
						<div className="row">
							<div className="col py-2">
								{store.Top5Coins.map((item, i) => {
									return <FlipCard Coin={item} key={i} />;
								})}
							</div>
						</div>
					</ScrollAnimation>
				</div>
				<ScrollAnimation animateIn="fadeIn" duration="1" animateOnce="true">
					<div className="mt-5">
						<h1 className="m-0 bg-white-50">Tipos de Cambio</h1>
					</div>
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" duration="1" animateOnce="true">
					<Converter />
				</ScrollAnimation>
				<ScrollAnimation animateIn="fadeIn" duration="1" animateOnce="true">
					<h1 className="mt-5 bg-white-50">Tendencias</h1>
				</ScrollAnimation>
				<div className="row row-cols-2 mb-5 mx-auto">
					<div className="col-xl-6 main-column mx-auto bg-white-50" id="mychart" />
					<div className="col-xl-6 main-column mx-auto minsize">
						<TradingViewWidget symbol="BTCUSD" theme={Themes.DARK} locale="es" autosize />
					</div>
				</div>
			</div>
		</div>
	);
};
