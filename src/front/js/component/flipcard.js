import React, { useEffect, useState, useContext, Component } from "react";
import { Context } from "../store/appContext";
import PropType from "prop-types";
import CoinMarketCap from "../services/coinmarketcap";

export const FlipCard = props => {
	const [Coin, setCoin] = useState({});
	const [ExistingAccount, SetExistingAcccount] = useState({});
	const CoinMarketCapSVC = new CoinMarketCap();

	function fnDetail() {
		CoinMarketCapSVC.Detail(props.CoinSymbol).then(res => {
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
					<img src={Coin.logo} className="w-100 p-3 mw-100 mh-100" />
				</div>
				<div className="flip-box-back mx-2 text-light">
					<h3 className="text-light">{Coin.name}</h3>
					<p>{props.CoinSymbol}</p>
					<h3 className="text-light">$50000</h3>
				</div>
			</div>
		</div>
	);
};
FlipCard.propTypes = {
	CoinSymbol: PropType.string
	// 2) add here the new properties into the proptypes object
};
