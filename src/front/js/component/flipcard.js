import React, { useEffect, useState, useContext, Component } from "react";
import { Context } from "../store/appContext";
import PropType from "prop-types";
import CoinMarketCap from "../services/coinmarketcap";
import rigoURL from "../../img/rigo-baby.jpg";
import CurrencyFormat from "react-currency-format";

export const FlipCard = props => {
	const [Coin, setCoin] = useState({});
	const CoinMarketCapSVC = new CoinMarketCap();

	function fnDetail() {
		CoinMarketCapSVC.DetailQuote(props.Coin.symbol).then(res => {
			//console.log(res);
			setCoin(res);
		});
	}

	useEffect(() => {
		console.log(fnDetail());
		fnDetail();
	}, []);

	return (
		<div className="flip-box p-1  text-light">
			<div className="flip-box-inner">
				<div className="flip-box-front">
					{/* <img src={Coin.logo} className="w-100 p-3 mw-100 mh-100" /> */}
					<img src={rigoURL} className="w-100 p-3 mw-100 mh-100 my-2" />
				</div>
				<div className="flip-box-back text-light">
					<h3 className="text-light mt-3 mb-0">{props.Coin.symbol}</h3>
					<p>{props.Coin.name}</p>
					<h3 className="text-light">
						<CurrencyFormat
							value={Coin.price}
							displayType={"text"}
							thousandSeparator={true}
							prefix={"$"}
							decimalScale={0}
						/>
					</h3>
				</div>
			</div>
		</div>
	);
};
FlipCard.propTypes = {
	Coin: PropType.object
	// 2) add here the new properties into the proptypes object
};
