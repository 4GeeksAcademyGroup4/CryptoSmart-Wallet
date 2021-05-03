import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import * as CryptoCharts from "cryptocharts";
import { Converter } from "../component/converter";
import { FlipCard } from "../component/flipcard";
import { Corousel } from "../component/carousel";

export const Landing = () => {
	const { store, actions } = useContext(Context);
	CryptoCharts.roiComparison({
		chart_id: "mychart",
		cryptocompare_tickers: ["BTC", "ETH"],
		iconomi_tickers: ["BLX", "CAR"],
		last_days: 90
	});

	useEffect(() => {
		actions.getTop5();
	}, []);

	return (
		<div className="text-center mt-5">
			<div className="container-fluid">
				<h1>Cree su cuenta, transfiera y reciba sus Crypto Monetadas a su convenencia</h1>
				<Corousel />
				<div className="pt-2 pb-5">
					<h1>Consulte el cambio su Crypto Moneda favorita a tiempo real</h1>
					<Converter />
				</div>
				<div id="flip-container mb-5">
					<h1>El top 9 de cryptomonedas</h1>
					<div className="row">
						<div className="col py-2">
							{store.Top5Coins.map((item, i) => {
								return <FlipCard CoinSymbol={item.symbol} key={i} />;
							})}
						</div>
					</div>
				</div>
				<h1>Graficos a tiempo real, con cambios en el tiempo</h1>
				<div className="py-5" id="mychart" />
				<div className="py-5">
					<TradingViewWidget symbol="BTCUSD" theme={Themes.DARK} locale="es" autosize />
				</div>
			</div>
		</div>
	);
};
