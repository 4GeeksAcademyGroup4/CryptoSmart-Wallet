import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import banner from "../../img/Banner.png";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import * as CryptoCharts from "cryptocharts";

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
				<p>
					<img className="img-fluid" src={banner} />
				</p>
				<p>
					<TradingViewWidget symbol="BTCUSD" theme={Themes.DARK} locale="es" autosize />
				</p>
				<p>
					<div id="mychart" />
				</p>
				<p>
					<coin-ponent dark-mode border-radius="30" font="monospace" />
				</p>
			</div>
		</div>
	);
};
