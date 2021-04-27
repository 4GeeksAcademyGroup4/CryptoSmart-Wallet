import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import CoinMarketCap from "../services/coinmarketcap";

export const CoinHome = props => {
	const [Coin, setCoin] = useState({});

	const CoinMarketCapSVC = new CoinMarketCap();

	async function fnDetail() {
		const response = await CoinMarketCapSVC.Detail(props.CoinID).then(res => {
			//console.log(res);
			setCoin(res);
		});
	}

	useEffect(() => {
		fnDetail();
	}, []);

	return (
		<div className="col-sm-3 text-center bg-dark my-2 py-2 mx-2 rounded">
			<img src={Coin.logo} className="w-100" />
			<p className="m-0 text-white">{Coin.name}</p>
		</div>
	);
};

CoinHome.propTypes = {
	CoinID: PropType.number
	// 2) add here the new properties into the proptypes object
};
